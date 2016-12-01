/**
 * Created by nelso on 11/24/2016.
 */

function voiceChannelLeave(e) {
    const mc = global.monstercat[e.channel.guild.id];
    if(!mc) return;
    if(e.user.id === process.env.DISCORD_CLIENT_ID) {
        mc.kill();
        return;
    }

    const channel = e.channel.guild.voiceChannels.find(channel => channel.id === e.channel.id);
    if(!channel) return;
    if(channel.members.length > 1) return;
    if(channel.members.find(member => member.id === process.env.DISCORD_CLIENT_ID)) {
        // start timeout
    }
}

module.exports = voiceChannelLeave;