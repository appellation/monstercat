import { Listener, ListenerHandler } from 'discord-akairo';

export default class ClientReadyListener extends Listener {
  constructor(handler: ListenerHandler) {
    super('client-error', {
      emitter: 'client',
      event: 'error',
    });

    this.client = handler.client;
  }

  exec(error: any) {
    this.client.logger.error(error);
  }
}
