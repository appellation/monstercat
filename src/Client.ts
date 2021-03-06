import { Client as Javelin } from 'javelin';
import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import path = require('path');
import { Logger } from 'winston';
import Sources from './audio/Sources';
import Broadcasts from './audio/Broadcasts';
import logger from './logger';
import Redis = require('ioredis');
import DestinationStore from './audio/DestinationStore';

declare module 'discord-akairo' {
  interface AkairoClient {
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;

    logger: Logger;
    twitch: Javelin;
    sources: Sources;
    broadcasts: Broadcasts;
    redis: Redis.Redis;
    destinations: DestinationStore;
  }
}

export default class MonstercatClient extends AkairoClient {
  public commandHandler: CommandHandler;
  public listenerHandler: ListenerHandler;
  public readonly logger: Logger;
  public twitch: Javelin;
  public sources: Sources;
  public broadcasts: Broadcasts;
  public redis: Redis.Redis;
  public destinations: DestinationStore;

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

    this.logger = logger;

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
    this.redis = new Redis(options.redis);
    this.destinations = new DestinationStore(this.redis);

    this.listenerHandler.setEmitters({ twitch: this.twitch });

    this.listenerHandler.loadAll();
    this.commandHandler.loadAll();
  }

  public async login(token: string) {
    const loggedin = await super.login(token);
    this.twitch.login();
    return loggedin;
  }
}
