import { Command } from 'discord-akairo';
import { Message } from 'discord.js';
import { StreamType } from '../Streams';

export default class InstinctCommand extends Command {
  constructor() {
    super('instinct', {
      aliases: ['instinct'],
      channel: 'guild',
    });
  }

  async exec(message: Message) {
    await this.client.stations.set(message.guild!.id, StreamType.INSTINCT);

    const join = this.handler.modules.get('join');
    return this.client.commandHandler.runCommand(message, join!, { station: StreamType.INSTINCT });
  }
}
