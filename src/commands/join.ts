import { Command, Validator } from 'discord-handles';

module.exports = class extends Command {
  public async pre() {
    await new Validator(this)
      // .apply(!this.guild.me.voiceChannel, 'I\'m already in a voice channel.')
      .apply(this.guild.me.permissions.has('CONNECT') && this.guild.me.permissions.has('SPEAK'), 'I cannot connect to or speak in your channel.')
      .apply(Boolean(this.member.voiceChannel), 'You\'re not in a voice channel. Please join one before using this command.');
  }

  public async exec() {
    await (this.client as any).ws.send((this.client as any).lavalink.join(this.message.guild.id, this.member.voiceChannelID, {}));
    await (this.client as any).lavalink.players.get(this.guild.id).play((this.client as any).track);
    await this.response.success(`now streaming to \`🔊 ${this.member.voiceChannel.name}\``);
  }
}
