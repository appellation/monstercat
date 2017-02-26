const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require('moment');
const { stripIndents } = require('common-tags')
require('moment-duration-format');

module.exports = class Stats extends Command {
    constructor(client) {
        super(client, {
            name: 'stats',
            group: 'info',
            memberName: 'stats',
            description: 'Display\'s stats about the bot.',
            throttling: {
                usages: 1,
                duration: 30
            }
        });
    }

    async run(msg) {
        return msg.channel.sendMessage(stripIndents`
        **Servers:** ${this.client.guilds.size}
        **Users:** ${this.client.guilds.reduce((a, b) => a + b.memberCount, 0)}
        **Channels:** ${this.client.channels.size}
        **Connections:** ${this.client.monstercat.dispatchers.size}
        
        __Process info__
        **Memory:** ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB
        **Uptime:** ${moment.duration(this.client.uptime).format('d[ days], h[ hours], m[ minutes and ]s[ seconds]')}
        `);
    }
};