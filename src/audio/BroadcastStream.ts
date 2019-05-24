import { BroadcastDispatcher, StreamDispatcher, VoiceBroadcast, VoiceConnection } from 'discord.js';
import { Signale } from 'signale';
import Track from './Track';

export default class BroadcastStream {
	public readonly logger: Signale = new Signale({ scope: 'broadcast stream' });

	constructor(public readonly broadcast: VoiceBroadcast, public readonly track: Track) {
		this.start();
	}

	public async start(): Promise<BroadcastDispatcher> {
		const stream = await this.track.stream();
		const dispatcher = this.broadcast.play(stream);

		dispatcher.on('error', (error) => {
			this.logger.warn(error);
			this.start();
		});

		dispatcher.on('close', () => {
			this.logger.info('closed');
			this.start();
		});

		this.logger.info('started track %s', this.track.url);
		return dispatcher;
	}

	public to(vc: VoiceConnection): StreamDispatcher {
		const dispatcher = vc.play(this.broadcast);
		dispatcher.on('error', (error) => {
			this.logger.warn(error);
			// do nothing: handled by broadcast error handler
		});

		this.logger.debug('playing on %s', vc.channel.id);
		return dispatcher;
	}
}
