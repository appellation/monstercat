import { Command, Validator } from 'discord-handles';

module.exports = class extends Command {
  public async pre() {
    await new Validator(this)
      .apply(this.member.voiceChannelID === this.guild.me.voiceChannelID && Boolean(this.guild.me.voiceChannelID), 'You\'re not in my voice channel. Please join it before using this command.');
  }

  public async exec() {
    if (this.client.lavalink) {
      const player = this.client.lavalink.players.get(this.guild.id);
      player.stop();
      player.join('', {});
    }

    return this.response.success('stopped streaming');
  }
}
