import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

module.exports = class Help extends Command {
  constructor() {
    super('invite', {
      aliases: ['invite'],
    });
  }

  public async exec(message: Message) {
    return message.reply('<https://discordapp.com/oauth2/authorize/?permissions=0&scope=bot&client_id=251253454826110977>');
  }
}
