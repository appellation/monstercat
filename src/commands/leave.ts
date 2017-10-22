import { Command, Validator } from 'discord-handles';

module.exports = class extends Command {
  public async pre() {
    await new Validator(this)
      .apply(this.member.voiceChannelID === this.guild.me.voiceChannelID, 'You\'re not in my voice channel. Please join it before using this command.')
      .apply(Boolean(this.guild.voiceConnection), 'I\'m not currently connected to a voice channel.');
  }

  public async exec() {
    this.guild.voiceConnection.disconnect();
    return this.response.success('stopped streaming');
  }
}
