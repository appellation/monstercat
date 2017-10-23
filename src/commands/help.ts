import { Command } from 'discord-handles';

module.exports = class extends Command {
  public async exec() {
    return this.response.success('available commands: **join**, **leave**, **invite**');
  }
}
