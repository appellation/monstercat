import { Listener } from 'discord-akairo';

export default class ClientReadyListener extends Listener {
  constructor() {
    super('client-error', {
      type: 'on',
      emitter: 'client',
      event: 'error',
    });
  }

  exec(error: any) {
    console.error(error);
  }
}
