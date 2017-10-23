import { inspect } from 'util';
import { Command, Validator, Argument } from 'discord-handles';

module.exports = class extends Command {
  public async pre() {
    await new Validator(this)
      .apply(this.author.id === process.env.OWNER, 'This command is owner-only.');

    await new Argument(this, 'code')
      .setInfinite()
      .setPrompt('What would you like to evaluate?');
  }

  public async exec() {
    return this.response.send(inspect(eval(this.args.code), { depth: 1 }), { code: 'js' });
  }
}
