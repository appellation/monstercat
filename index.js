/**
 * Created by Will on 11/23/2016.
 */

const Discord = require('discordie');
require('dotenv').config({
    path: __dirname + '/.env',
    silent: true
});
const storage = require('./operators/storage');

const message_create = require('./handlers/message_create');
const voice_channel_leave = require('./handlers/voice_channel_leave');

const client = new Discord();
storage.client = client;

client.Dispatcher.on('MESSAGE_CREATE', message_create);
// client.Dispatcher.on('VOICE_CHANNEL_LEAVE', voice_channel_leave);
client.Dispatcher.on('GATEWAY_READY', () => {
    console.log('ready');
});
// client.Dispatcher.on('DISCONNECTED', () => process.exit(0));
client.autoReconnect.enable();
client.connect({
    token: process.env.DISCORD_TOKEN
});
