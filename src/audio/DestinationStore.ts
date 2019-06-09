import { ChannelStore, DiscordAPIError, Guild, GuildMember, VoiceChannel, VoiceConnection } from 'discord.js';
import { Redis } from 'ioredis';
import logger from '../logger';
import AudioError, { AudioErrorCode } from './AudioError';

export default class DestinationStore {
	public static readonly KEY = 'streams';

	constructor(public readonly redis: Redis) {}

	public async join(memberOrChan: GuildMember | VoiceChannel): Promise<VoiceConnection> {
		const me = memberOrChan.guild.me || await memberOrChan.guild.members.fetch(memberOrChan.client.user!);
		const chan = memberOrChan instanceof GuildMember ? memberOrChan.voice.channel : memberOrChan;

		if (!chan) throw new AudioError(AudioErrorCode.NO_VC, 'play music');
		if (!chan.joinable) throw new AudioError(AudioErrorCode.MISSING_PERMISSIONS, 'join your channel');
		let vc: VoiceConnection;
		try {
			vc = await chan.join();
		} catch (e) {
			if (e instanceof DiscordAPIError) {
				switch (e.code) {
					case 50013:
						throw new AudioError(AudioErrorCode.MISSING_PERMISSIONS, 'join your channel');
				}
			}

			throw e;
		}

		await this.set(chan);
		return vc;
	}

	public async leave(guild: Guild) {
		const me = guild.me || await guild.members.fetch(guild.client.user!);
		const conn = me.voice.connection;
		if (!conn) return;

		conn.dispatcher.end();
		conn.channel.leave();

		await this.delete(guild);
	}

	public set(channel: VoiceChannel): Promise<0 | 1> {
		return this.redis.hset(DestinationStore.KEY, channel.guild.id, channel.id);
	}

	public delete(guild: Guild | string): Promise<any> {
		const id = typeof guild === 'string' ? guild : guild.id;
		return this.redis.hdel(DestinationStore.KEY, id);
	}

	public async *joinAll(channels: ChannelStore): AsyncIterableIterator<VoiceConnection> {
		const ids: { [guildID: string]: string } = await this.redis.hgetall(DestinationStore.KEY);
		const iter = Object.entries(ids).map(async ([guildID, id]) => {
			const chan = channels.get(id);
			if (!chan || !(chan instanceof VoiceChannel)) {
				await this.delete(guildID);
				return;
			}

			try {
				return await this.join(chan);
			} catch (e) {
				logger.warn('failed to stream to saved channel %s (%s): removing', id, e);
				await this.delete(guildID);
			}
		});

		for await (const vc of iter) {
			if (vc) yield vc;
		}
	}
}
