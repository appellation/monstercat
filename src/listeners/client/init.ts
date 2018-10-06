import { Listener } from 'discord-akairo';

export default class ClientReadyListener extends Listener {
  constructor() {
    super('ready', {
      type: 'once',
      emitter: 'client',
      event: 'ready',
    });
  }

  exec() {
    this.client.user.setActivity('Monstercat', {
      type: 'STREAMING',
      url: 'https://twitch.tv/monstercat'
    });
  }
}
