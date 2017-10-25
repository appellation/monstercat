import { Command, Validator } from 'discord-handles';

module.exports = class extends Command {
  public async pre() {
    await new Validator(this)
      .apply(this.client.broadcasts.length > 0, 'Stream has not finished initializing. Please wait...')
      .apply(Boolean(this.member.voiceChannel), 'You\'re not in a voice channel. Please join one before using this command.');
  }

  public async exec() {
    let vc = this.guild.voiceConnection || await this.member.voiceChannel.join();

    const dispatcher = vc.playBroadcast(this.client.broadcasts[0]);
    dispatcher.setVolumeLogarithmic(0.5);
    await this.response.success(`now streaming to \`🔊 ${vc.channel.name}\``);
  }
}
