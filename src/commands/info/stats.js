const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const moment = require('moment');
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
        const embed = new RichEmbed()
        .setAuthor('Monstercat Statistics', this.client.user.avatarURL)
        .setColor(8450847)
        .addField('Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024)}MB`, true)
        .addField('Uptime', moment.duration(this.client.uptime).format('d[ days], h[ hours], m[ minutes and ]s[ seconds]'), true)
        .addField('\u200b', '\u200b', true)
        .addField('Servers', `${this.client.guilds.size}`, true)
        .addField('Channels', `${this.client.channels.size}`, true)
        .addField('Users', `${this.client.guilds.map(guild => guild.memberCount).reduce((a, b) => a + b)}`, true)
        .addField('Bot Support', '[Join](https://discord.gg/DPuaDvP)', true)
        .addField('Authors', 'appellation#5297, Fire#7374', true)
        .setTimestamp();
        msg.embed(embed);
    }
};