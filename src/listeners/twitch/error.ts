import { Listener, ListenerHandler } from 'discord-akairo';
import { Logger } from 'winston';

export default class TwitchErrorListener extends Listener {
  public logger: Logger;

  constructor(handler: ListenerHandler) {
    super('twitch-error', {
      event: 'error',
      emitter: 'twitch',
    });

    this.client = handler.client;
    this.logger = this.client.logger.child({ service: 'javelin' });
  }

  exec(pk: any) {
    this.logger.error(pk);
  }
}
