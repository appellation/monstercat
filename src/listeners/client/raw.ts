import { Listener } from 'discord-akairo';

export default class ClientRawListener extends Listener {
  constructor() {
    super('raw', {
      event: 'raw',
      emitter: 'client',
    });
  }

  exec(pk: any) {
    switch (pk.t) {
      case 'VOICE_STATE_UPDATE':
        this.client.lavalink.voiceStateUpdate(pk.d);
        break;
      case 'VOICE_SERVER_UPDATE':
        this.client.lavalink.voiceServerUpdate(pk.d);
        break;
    }
  }
}
