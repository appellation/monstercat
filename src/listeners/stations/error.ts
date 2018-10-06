import { Listener } from 'discord-akairo';

export default class ErrorListener extends Listener {
  constructor() {
    super('stations-error', {
      event: 'error',
      emitter: 'stations',
    });
  }

  exec(error: Error) {
    // TODO: better error handling
    console.error(error);
  }
}
