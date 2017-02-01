const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const stripIndents = require('common-tags').stripIndents;

module.exports = class Song extends Command {
    constructor(client) {
        super(client, {
            name: 'song',
            group: 'monstercat',
            memberName: 'song',
            description: 'Display\'s the current song that\'s playing on the bot.' 
        });
    }
    
    async run(msg) {
        const embed = new RichEmbed()
        .setAuthor(this.client.user.username, this.client.user.avatarURL)
        .setColor(3447003)
        .setDescription(`The current song playing is: ${this.client.user.presence.game.name}`);
        return msg.embed(embed);
    }
};