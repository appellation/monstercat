import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { Broadcast } from '../audio/Broadcasts';

module.exports = class JoinCommand extends Command {
  constructor() {
    super('join', {
      aliases: ['join'],
      clientPermissions: ['CONNECT', 'SPEAK'],
      channel: 'guild'
    });
  }

  public async exec(message: Message, args: any = {}) {
    if (!message.member!.voice.channel) return message.util!.reply('You\'re not in a voice channel. Please join one before using this command.');

    const vc = await message.member!.voice.channel.join();
    try {
      await this.client.broadcasts.get(Broadcast.UNCAGED)!.to(vc);
    } catch {
      return message.util!.reply('unable to find a station to stream. please try again in a few minutes.');
    }

    const station = `<:monstercat:256205225554214913> Uncaged`;
    return message.util!.reply(`now streaming ${station} to \`🔊 ${message.member!.voice.channel.name}\``);
  }
}
