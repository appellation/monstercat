/**
 * Created by Will on 11/23/2016.
 */

const Discord = require('discordie');
require('dotenv').config({
    path: __dirname + '/.env',
    silent: true
});

const message_create = require('./handlers/message_create');
const voice_channel_leave = require('./handlers/voice_channel_leave');

const client = new Discord();

client.Dispatcher.on('MESSAGE_CREATE', message_create);
// client.Dispatcher.on('VOICE_CHANNEL_LEAVE', voice_channel_leave);
client.Dispatcher.on('GATEWAY_READY', () => {
    global.monstercat = {};
    console.log('ready');
});
client.connect({
    token: process.env.DISCORD_TOKEN
});
