const { Command } = require('discord.js-commando');
const stripIndents = require('common-tags').stripIndents;

module.exports = class Invite extends Command {
    constructor(client) {
        super(client, {
            name: 'leave',
            alias: '🖕',
            group: 'monstercat',
            memberName: 'leave',
            description: 'Removes the bot from your voice channel.',
            throttling: {
                usages: 1,
                duration: 15
            }
        });
    }
    
    async run(msg) {
        msg.client.monstercat.disconnect(msg.guild);
    }
};