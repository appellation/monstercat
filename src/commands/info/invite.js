const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const stripIndents = require('common-tags').stripIndents;

module.exports = class Invite extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'info',
            memberName: 'invite',
            description: 'Display\'s the bot\'s invite link.' 
        });
    }
    
    async run(msg) {
        const embed = new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.avatarURL)
        .setColor(3447003)
        .setDescription(stripIndents`In order to invite me to your server, click [here](https://google.com)`);
        return msg.embed(embed);
    }
};