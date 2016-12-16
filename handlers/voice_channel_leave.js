/**
 * Created by nelso on 11/24/2016.
 */

const storage = require('../operators/storage');

function voiceChannelLeave(e) {
    const mc = storage.monstercat[e.channel.guild.id];
    if(!mc) return;
    if(e.user.id === process.env.DISCORD_CLIENT_ID) {
        mc.kill();
        delete storage.monstercat[e.channel.guild.id];
        return;
    }

    const channel = e.channel.guild.voiceChannels.find(channel => channel.id === e.channelId);
    const newChannel = e.channel.guild.voiceChannels.find(channel => channel.id === e.newChannelId);
    if(!channel || channel.members.length > 1) return;
    mc.stop();
}

module.exports = voiceChannelLeave;