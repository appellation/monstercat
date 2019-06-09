import { Command } from 'discord-akairo';
import { DiscordAPIError, Message, VoiceConnection } from 'discord.js';
import { Broadcast } from '../audio/Broadcasts';

module.exports = class JoinCommand extends Command {
  constructor() {
    super('join', {
      aliases: ['join'],
      clientPermissions: ['CONNECT', 'SPEAK'],
      channel: 'guild'
    });
  }

  public async exec(message: Message) {
    const member = message.member || await message.guild!.members.fetch(message.author!.id);
    if (!member.voice.channel) return message.util!.reply('You\'re not in a voice channel. Please join one before using this command.');

    let vc: VoiceConnection;
    try {
      vc = await this.client.destinations.join(member);
    } catch (e) {
      return message.util!.reply(`${e && e.message}`);
    }

    this.client.broadcasts.get(Broadcast.UNCAGED)!.to(vc);

    const station = `<:monstercat:256205225554214913> Uncaged`;
    return message.util!.reply(`now streaming ${station} to \`🔊 ${member.voice.channel.name}\``);
  }
}
