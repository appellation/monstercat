import { inspect } from 'util';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';

export default class EvalCommand extends Command {
  constructor() {
    super('eval', {
      aliases: ['eval'],
      args: [{
        id: 'code',
        type: 'string',
        match: 'rest',
      }],
      ownerOnly: true,
    });
  }

  public async exec(message: Message, args: any) {
    return message.util!.reply(inspect(eval(args.code), { depth: 1 }), { code: 'js' });
  }
}
