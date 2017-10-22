import { Command, Validator } from 'discord-handles';

module.exports = class extends Command {
  public async pre() {
    await new Validator(this)
      .apply(Boolean(this.client.broadcasts[0]), 'Stream has not finished initializing. Please wait...')
      .apply(Boolean(this.member.voiceChannel), 'You\'re not in a voice channel. Please join one before using this command.');
  }

  public async exec() {
    const vc = this.guild.voiceConnection || await this.member.voiceChannel.join();
    vc.playBroadcast(this.client.broadcasts[0]);
    return this.response.success(`now streaming to \`${vc.channel.name}\``);
  }
}
