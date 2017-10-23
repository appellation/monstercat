import * as path from 'path';
import { Buffer } from 'buffer';

import { config } from 'dotenv';
import twitch = require('twitch-get-stream');
import Websocket = require('ws');
import { Client } from 'discord.js';
import { Client as Handles } from 'discord-handles';

config({ path: '../.env' });

module.exports = new class extends Client {
  public readonly handles: Handles;

  constructor() {
    super();

    this.handles = new Handles(this, {
      prefixes: new Set(['mc!']),
      directory: path.resolve(__dirname, 'commands'),
    });

    this.once('ready', this.init.bind(this));

    const token = process.env.DISCORD_TOKEN;
    if (!token) throw new Error('no discord token');
    this.login(token);
  }

  public async init() {
    this.startStream();

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
        this.user.setGame(game, 'https://twitch.tv/monstercat');
      }
    });
    connection.once('open', () => {
      connection.send(`PASS ${process.env.TWITCH_OAUTH_PASSWORD}`);
      connection.send(`NICK ${process.env.TWITCH_USERNAME}`);
      connection.send('JOIN #monstercat');
    });

    console.log('ready');
  }

  public async startStream() {
    const clientID = process.env.TWITCH_CLIENT_ID;
    if (!clientID) throw new Error('no twitch client ID provided');

    const streams = await twitch(clientID).get('monstercat');
    const stream = streams.pop();
    if (!stream) {
      setTimeout(() => this.startStream(), 10000);
      return;
    }

    const broadcast = this.broadcasts.length ? this.broadcasts[0] : this.createVoiceBroadcast();
    broadcast
      .once('error', () => this.startStream())
      .once('end', () => this.startStream());
    broadcast.playArbitraryInput(stream.url);
  }
}
