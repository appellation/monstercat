import { Client as Javelin } from 'javelin';
import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import Keyv = require('keyv');
import path = require('path');
import Sources from './audio/Sources';
import Broadcasts from './audio/Broadcasts';

declare module 'discord-akairo' {
  interface AkairoClient {
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;

    twitch: Javelin;
    sources: Sources;
    broadcasts: Broadcasts;
    stations: Keyv;

    uncaged?: string;
    instinct?: string;
  }
}

export default class MonstercatClient extends AkairoClient {
  public commandHandler: CommandHandler;
  public listenerHandler: ListenerHandler;
  public twitch: Javelin;
  public sources: Sources;
  public broadcasts: Broadcasts;
  public stations: Keyv;

  constructor(options: {
    ownerID: string,
    clientID: string,
    twitch: { oauth: string, username: string },
    redis: string,
  }) {
    super({
      ownerID: options.ownerID,
    }, {
      disableEveryone: true,
      disabledEvents: [
        'TYPING_START',
      ],
    });

    this.commandHandler = new CommandHandler(this, {
      directory: path.resolve(__dirname, 'commands'),
      prefix: ['mc!', 'mc.'],
      handleEdits: true,
      commandUtil: true,
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: path.resolve(__dirname, 'listeners'),
    });
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.twitch = new Javelin({
      oauth: options.twitch.oauth,
      username: options.twitch.username,
      channels: ['#monstercat'],
    });

    this.sources = new Sources();
    this.broadcasts = new Broadcasts(this.voice!, this.sources);
    this.stations = new Keyv(options.redis, { namespace: 'stations' });

    this.listenerHandler.setEmitters({
      twitch: this.twitch,
      stations: this.stations,
    });

    this.listenerHandler.loadAll();
    this.commandHandler.loadAll();
  }

  public async login(token: string) {
    const loggedin = await super.login(token);
    this.twitch.login();
    return loggedin;
  }
}
