import * as path from 'path';

import { config } from 'dotenv';
import twitch = require('twitch-get-stream');
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
    await this.startStream();
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
