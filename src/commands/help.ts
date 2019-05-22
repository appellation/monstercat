import { Command, CommandUtil } from 'discord-akairo';
import { Message } from 'discord.js';

module.exports = class Help extends Command {
  constructor() {
    super('help', {
      aliases: ['help'],
    });
  }

  public async exec(message: Message) {
    return message.util!.send('available commands: **join**, **leave**, **invite**');
  }
}
