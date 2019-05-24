import { Listener, ListenerHandler } from 'discord-akairo';
import { Signale } from 'signale';

export default class TwitchErrorListener extends Listener {
  public logger: Signale;

  constructor(handler: ListenerHandler) {
    super('twitch-error', {
      event: 'error',
      emitter: 'twitch',
    });

    this.client = handler.client;
    this.logger = this.client.logger.scope('javelin');
  }

  exec(pk: any) {
    this.logger.error(pk);
  }
}
