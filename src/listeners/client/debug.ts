import { Listener, ListenerHandler } from 'discord-akairo';

export default class ClientReadyListener extends Listener {
  constructor(handler: ListenerHandler) {
    super('client-debug', {
      emitter: 'client',
      event: 'debug',
    });

    this.client = handler.client;
  }

  exec(msg: string) {
    if (msg.includes('VOICE')) this.client.logger.debug(msg);
  }
}
