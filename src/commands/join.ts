import { Command, Validator } from 'discord-handles';

module.exports = class extends Command {
  public async pre() {
    await new Validator(this)
      // .apply(!this.guild.me.voiceChannel, 'I\'m already in a voice channel.')
      .apply(this.guild.me.permissions.has('CONNECT') && this.guild.me.permissions.has('SPEAK'), 'I cannot connect to or speak in your channel.')
      .apply(Boolean(this.member.voiceChannel), 'You\'re not in a voice channel. Please join one before using this command.');
  }

  public async exec() {
    if (this.client.lavalink && this.client.track) {
      const player = this.client.lavalink.players.get(this.guild.id);
      player.join(this.member.voiceChannelID, {});
      player.play(this.client.track);
    }

    return this.response.success(`now streaming to \`🔊 ${this.member.voiceChannel.name}\``);
  }
}
