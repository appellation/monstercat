const { Command } = require('discord.js-commando');
const stripIndents = require('common-tags').stripIndents;

module.exports = class Invite extends Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'monstercat',
            memberName: 'join',
            description: 'Invite\'s the music bot to your voice channel.',
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 15
            }
        });
    }

    async run(msg) {
        let voiceChan = msg.member.voiceChannel;

        if(!voiceChan) {
            return msg.reply('you\'re not in a voice channel.');
        }

        const botPerm = voiceChan.permissionsFor(msg.client.user);

        if(!botPerm.hasPermission('CONNECT')) {
            return msg.reply('Insufficient Permissions. I\'m unable to join your voice channel.');
        }
        if(!botPerm.hasPermission('SPEAK')) {
            return msg.reply('Insufficient Permissions. I\'m unable to broadcast music in this channel.');
        }
        if(!this.client.monstercat) {
            return msg.reply('Stream has not finished initializing.  Please wait.');
        }

        this.client.monstercat.connect(msg.member);
    }
};
