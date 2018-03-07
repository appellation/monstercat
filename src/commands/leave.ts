import { Command, Validator } from 'discord-handles';

module.exports = class extends Command {
  public async pre() {
    await new Validator(this)
      .apply(this.member.voiceChannelID === this.guild.me.voiceChannelID && Boolean(this.guild.me.voiceChannelID), 'You\'re not in my voice channel. Please join it before using this command.');
  }

  public async exec() {
    (this.client as any).lavalink.players.get(this.guild.id).stop();
    (this.client as any).ws.send({
      op: 4,
      d: {
        channel_id: null,
        guild_id: this.guild.id,
        self_mute: false,
        self_deaf: true,
      },
    });
    return this.response.success('stopped streaming');
  }
}
