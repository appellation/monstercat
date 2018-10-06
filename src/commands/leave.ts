import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

module.exports = class extends Command {
  constructor() {
    super('leave', {
      aliases: ['leave'],
      channel: 'guild',
    });
  }

  public async exec(message: Message) {
    const player = this.client.lavalink.players.get(message.guild.id);
    player.stop();
    player.leave();
    return message.reply('stopped streaming');
  }
}
