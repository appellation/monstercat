import { Listener } from 'discord-akairo';

export default class LavalinkErrorListener extends Listener {
  constructor() {
    super('lavalin-error', {
      event: 'error',
      emitter: 'lavalink',
    });
  }

  public exec(error: Error) {
    console.error(error);
  }
}
