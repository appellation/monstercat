import { Listener, ListenerHandler } from 'discord-akairo';
import { Signale } from 'signale';

export default class ErrorListener extends Listener {
  public logger: Signale;

  constructor(handler: ListenerHandler) {
    super('stations-error', {
      event: 'error',
      emitter: 'stations',
    });

    this.client = handler.client;
    this.logger = this.client.logger.scope('keyv');
  }

  exec(error: Error) {
    this.logger.error(error);
  }
}
