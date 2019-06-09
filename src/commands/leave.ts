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
    await this.client.destinations.leave(message.guild!);
    return message.util!.reply('stopped streaming');
  }
}
