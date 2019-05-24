import { Command } from 'discord-akairo';
import { Message, VoiceConnection } from 'discord.js';

module.exports = class extends Command {
  constructor() {
    super('leave', {
      aliases: ['leave'],
      channel: 'guild',
    });
  }

  public async exec(message: Message) {
    if (!message.guild!.me) return;

    const conn = (message.guild!.me.voice as any).connection as VoiceConnection | null;
    if (!conn) return message.util!.reply('I\'m not currently connected to a voice channel.');

    const dispatcher = conn.dispatcher;
    if (dispatcher) dispatcher.end();

    conn.channel.leave();
    return message.util!.reply('stopped streaming');
  }
}
