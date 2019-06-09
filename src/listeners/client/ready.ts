import { Listener } from 'discord-akairo';
import { Broadcast } from '../../audio/Broadcasts';

export default class ClientReadyListener extends Listener {
  constructor() {
    super('ready', {
      emitter: 'client',
      event: 'ready',
    });
  }

  async exec() {
    this.client.user!.setActivity('Monstercat', {
      type: 'STREAMING',
      url: 'https://twitch.tv/monstercat'
    });

    const vcs = this.client.destinations.joinAll(this.client.channels);
    for await (const vc of vcs) {
      this.client.broadcasts.get(Broadcast.UNCAGED).to(vc);
    }
  }
}
