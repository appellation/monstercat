/**
 * Created by Will on 1/23/2017.
 */

require('dotenv').config();
const Discord = require('discord.js');
const handles = require('discord-handles')({
    directory: './src/commands'
});

const client = new Discord.Client();

client.on('message', handles);
client.on('ready', () => {
    console.log('ready');
    require('./handlers/init')(client);
});

client.login(process.env.DISCORD_TOKEN);

