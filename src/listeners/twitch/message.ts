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

    const status = message.content.match(/^Now playing (.+) by (.+)\s+monstercat\.com.*$/i);
    if (!status) return;

    const game = `${status[2]} - ${status[1]}`;
    this.client.logger.debug('setting game to %s', game);
    this.client.user!.setActivity(game, {
      type: 'STREAMING',
      url: 'https://twitch.tv/monstercat'
    });
  }
}
