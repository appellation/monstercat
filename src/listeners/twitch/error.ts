import { Listener } from 'discord-akairo';

export default class TwitchErrorListener extends Listener {
  constructor() {
    super('twitch-error', {
      event: 'error',
      emitter: 'twitch',
    });
  }

  exec(pk: any) {
    console.error('[javelin]', pk);
  }
}
