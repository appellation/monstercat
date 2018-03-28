import * as path from 'path';
import { Buffer } from 'buffer';

import axios from 'axios';
import { Client as Lavalink } from 'lavalink';
import twitch = require('twitch-get-stream');
import Websocket = require('ws');
import { Client, VoiceBroadcast } from 'discord.js';
import { Client as Handles } from 'discord-handles';

declare module 'discord.js' {
  interface Client {
    handles: Handles;
    lavalink?: Lavalink;
    track?: string;
  }
}

module.exports = new class MonstercatClient extends Client {
  public readonly handles: Handles;
  public lavalink?: Lavalink;
  public track?: string;

  constructor() {
    super();

    this.handles = new Handles(this, {
      prefixes: new Set(['mc!']),
      directory: path.resolve(__dirname, 'commands'),
    });

    this.handles.on('commandError', console.error);

    this.once('ready', this.init.bind(this));

    const token = process.env.DISCORD_TOKEN;
    if (!token) throw new Error('no discord token');
    this.login(token);
  }

  public async init() {
    if (!process.env.DISCORD_CLIENT_ID) throw new Error('no discord client ID available');
    const self = this;
    this.lavalink = new class extends Lavalink {
      constructor() {
        super({
          password: 'youshallnotpass',
          userID: self.user.id,
        });
      }

      send(guild: string, pk: any) {
        if (self.guilds.has(guild)) return (self as any).ws.send(pk);
        return Promise.resolve();
      }
    }

    this.on('raw', (pk: any) => {
      if (!this.lavalink) return;

      switch (pk.t) {
        case 'VOICE_STATE_UPDATE':
          this.lavalink.voiceStateUpdate(pk.d);
          break;
        case 'VOICE_SERVER_UPDATE':
          this.lavalink.voiceServerUpdate(pk.d);
          break;
      }
    });

    let connected = false;
    while (!connected) {
      try {
        await this.lavalink.connect('ws://lavalink:8080');
        connected = true;
      } catch {
        await new Promise(r => setTimeout(r, 1e3));
      }
    }

    while (!this.track) {
      try {
        this.track = (await axios.get('http://lavalink:8081/loadtracks', {
          params: { identifier: 'https://www.twitch.tv/monstercat' },
          headers: { Authorization: this.lavalink.password },
        })).data[0].track;
      } catch {
        await new Promise(r => setTimeout(r, 1e3));
      }
    }

    console.log(this.track);

    const connection = new Websocket('wss://irc-ws.chat.twitch.tv', 'irc');
    connection.on('message', (message: Websocket.Data) => {
      if (message instanceof ArrayBuffer) message = Buffer.from(message);
      if (Array.isArray(message)) message = Buffer.concat(message);
      if (message instanceof Buffer) message = message.toString('utf8');

      if (message.startsWith('PING :tmi.twitch.tv')) {
        connection.send('PONG :tmi.twitch.tv');
        return;
      }

      const match = message.match(/^:([^:]+) :(.+)/);
      if (!match) return;

      const [, prefix, content] = match;
      if (prefix === 'monstercat!monstercat@monstercat.tmi.twitch.tv PRIVMSG #monstercat') {
        const status = content.match(/^Now Playing: (.+) by (.+)/);
        if (!status) return;

        const game = `${status[2].replace(/ - (Listen now: \S+ Tweet it: \S+|Listen on Spotify: \S+)$/, '')} - ${status[1]}`;
        this.user.setPresence({
          activity: {
            type: 'STREAMING',
            name: game,
            url: 'https://twitch.tv/monstercat'
          }
        });
      }
    });

    connection.once('open', () => {
      connection.send(`PASS ${process.env.TWITCH_OAUTH_PASSWORD}`);
      connection.send(`NICK ${process.env.TWITCH_USERNAME}`);
      connection.send('JOIN #monstercat');
    });

    this.user.setPresence({
      activity: {
        type: 'STREAMING',
        name: 'Monstercat',
        url: 'https://twitch.tv/monstercat'
      }
    });

    console.log('ready');
  }
}
