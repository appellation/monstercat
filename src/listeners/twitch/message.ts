import { Listener } from 'discord-akairo';
import { Message } from 'javelin';

export default class TwitchMessageListener extends Listener {
  constructor() {
    super('twitch-message', {
      emitter: 'twitch',
      event: 'message',
    });
  }

  exec(message: Message) {
    if (message.user.username !== 'monstercat') return;

    console.log(message.content);
    const status = message.content.match(/^Now Playing: (.+) by (.+)/);
    if (!status) return;

    const game = `${status[2].replace(/ - (Listen now: \S+ Tweet it: \S+|Listen on Spotify: \S+)$/, '')} - ${status[1]}`;
    this.client.user.setActivity(game, {
      type: 'STREAMING',
      url: 'https://twitch.tv/monstercat'
    });
  }
}
