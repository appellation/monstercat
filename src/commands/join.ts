import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { StreamType } from '../Streams';

module.exports = class JoinCommand extends Command {
  constructor() {
    super('join', {
      aliases: ['join'],
      clientPermissions: ['CONNECT', 'SPEAK'],
      channel: 'guild',
    });
  }

  public async exec(message: Message, args: any = {}) {
    if (!message.member!.voice.channel) return message.reply('You\'re not in a voice channel. Please join one before using this command.');

    let type: StreamType | undefined = args.station || await this.client.stations.get(message.guild!.id);
    if (type === undefined) type = StreamType.UNCAGED;

    const player = this.client.lavalink.players.get(message.guild!.id);
    await player.join(message.member!.voice.channel.id);

    if (player.playing) {
      await player.stop();
      await new Promise(r => setTimeout(r, 2000));
    }

    try {
      await this.client.streams.play(type, player);
    } catch {
      return message.reply('unable to find a station to stream. please try again in a few minutes.');
    }

    const station = `<:monstercat:256205225554214913> ${StreamType[type][0].toUpperCase() + StreamType[type].slice(1).toLowerCase()}`;
    return message.reply(`now streaming ${station} to \`🔊 ${message.member!.voice.channel.name}\``);
  }
}
