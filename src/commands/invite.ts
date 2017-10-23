import { Command } from 'discord-handles';

module.exports = class extends Command {
  public async exec() {
    return this.response.success('<https://discordapp.com/oauth2/authorize/?permissions=0&scope=bot&client_id=251253454826110977>');
  }
}
