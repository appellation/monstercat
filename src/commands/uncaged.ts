import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { StreamType } from '../Streams';

export default class InstinctCommand extends Command {
  constructor() {
    super('uncaged', {
      aliases: ['uncaged'],
      channel: 'guild',
    });
  }

  async exec(message: Message) {
    await this.client.stations.set(message.guild.id, StreamType.UNCAGED);

    const join = this.handler.findCommand('join');
    return this.client.commandHandler.runCommand(message, join, { station: StreamType.UNCAGED });
  }
}
