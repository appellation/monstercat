import { Listener, ListenerHandler } from 'discord-akairo';
import { Logger } from 'winston';

export default class ErrorListener extends Listener {
  public logger: Logger;

  constructor(handler: ListenerHandler) {
    super('stations-error', {
      event: 'error',
      emitter: 'stations',
    });

    this.client = handler.client;
    this.logger = this.client.logger.child({ service: 'keyv' });
  }

  exec(error: Error) {
    this.logger.error(error);
  }
}
