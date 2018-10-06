import { inspect } from 'util';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

module.exports = class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval'],
      args: [{
        id: 'code',
        type: 'string',
      }],
      ownerOnly: true,
    });
  }

  public async exec(message: Message, args: any) {
    return message.reply(inspect(eval(args.code), { depth: 1 }), { code: 'js' });
  }
}
