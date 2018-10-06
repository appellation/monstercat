import { Node } from 'lavalink';
import { Client as Javelin } from 'javelin';
import { AkairoClient, CommandHandler, ListenerHandler } from 'discord-akairo';
import Keyv = require('keyv');
import path = require('path');
import Streams from './Streams';

declare module 'discord-akairo' {
  interface AkairoClient {
    commandHandler: CommandHandler;
    listenerHandler: ListenerHandler;

    lavalink: Node;
    twitch: Javelin;
    stations: Keyv;
    streams: Streams;

    uncaged?: string;
    instinct?: string;
  }
}

export default class MonstercatClient extends AkairoClient {
  public commandHandler: CommandHandler;
  public listenerHandler: ListenerHandler;
  public lavalink: Node;
  public twitch: Javelin;
  public stations: Keyv;
  public streams: Streams;

  constructor(options: {
    ownerID: string,
    clientID: string,
    lavalink: { password: string, rest: string, ws: string },
    twitch: { oauth: string, username: string },
  }) {
    super({
      ownerID: options.ownerID,
    }, {
      disableEveryone: true,
      disabledEvents: [
        'VOICE_SERVER_UPDATE', // stop d.js from initiating voice connections
        'TYPING_START',
      ],
    });

    this.commandHandler = new CommandHandler(this, {
      directory: path.join('dist', 'commands'),
      prefix: ['mc!', 'mc.'],
      handleEdits: true,
      commandUtil: true,
    });

    this.listenerHandler = new ListenerHandler(this, {
      directory: path.join('dist', 'listeners'),
    });
    this.commandHandler.useListenerHandler(this.listenerHandler);

    this.lavalink = new Node({
      password: options.lavalink.password,
      userID: options.clientID,
      send: (guild: string, pk: any) => {
        if (this.guilds.has(guild)) return (this as any).ws.send(pk);
        return Promise.resolve();
      },
      hosts: options.lavalink,
    });

    this.twitch = new Javelin({
      oauth: options.twitch.oauth,
      username: options.twitch.username,
      channels: ['#monstercat'],
    });

    this.stations = new Keyv('sqlite://data/db.sqlite', { namespace: 'stations' });
    this.streams = new Streams(this.lavalink);

    this.listenerHandler.setEmitters({
      lavalink: this.lavalink,
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
