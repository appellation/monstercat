import { inspect } from 'util';
import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import axios from 'axios';

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
    let result: any;
    try {
      result = await eval(args.code);
    } catch (e) {
      result = e;
    }

    let text = inspect(result, { depth: 1 });
    if (text.length > 1990) {
      let key: string;
      try {
        ({ data: { key } } = await axios.post('https://paste.nomsy.net/documents', text));
      } catch {
        return message.util!.reply('Unable to display error or upload to Hastebin.');
      }

      return message.util!.reply(`https://paste.nomsy.net/${key}.js`);
    }

    return message.util!.reply(text, { code: 'js' });
  }
}
