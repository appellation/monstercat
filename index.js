/**
 * Created by Will on 11/23/2016.
 */

const Discord = require('discord.js');
require('dotenv').config({
    path: __dirname + '/.env',
    silent: true
});

const message = require('./handlers/message');
const voiceStateUpdate = require('./handlers/voiceStateUpdate');

const client = new Discord.Client();

client.on('message', message);
client.on('voiceStateUpdate', voiceStateUpdate);
client.on('ready', () => {
    console.log('ready');
});
client.login(process.env.DISCORD_TOKEN);
