const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const stripIndents = require('common-tags').stripIndents;

module.exports = class About extends Command {
    constructor(client) {
        super(client, {
            name: 'about',
            aliases: ['info', 'invite'],
            group: 'info',
            memberName: 'about',
            description: 'Display\'s information about the bot.'
        });
    }
    
    async run(msg) {
        const embed = new RichEmbed()
        .setColor(3447003)
        .setDescription(stripIndents`
        **About Monstercat**
        Bringing top quality Monstercat streams to Discord since tomorrow. This bot will bring even more awesomeness to your server, so what are you waiting for? Invite it and get the party started! 🎉
        
        Invite Link: [https://discordapp.com/oauth2/authorize?permissions=3165184&scope=bot&client_id=251253454826110977].`)
        .setThumbnail('https://cdn.discordapp.com/avatars/251253454826110977/2acc97e13036b458fd4a7635bd7e931d.jpg?size=1024');
        return msg.embed(embed);
    }
};
