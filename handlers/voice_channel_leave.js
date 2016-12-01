/**
 * Created by nelso on 11/24/2016.
 */

function voiceChannelLeave(e) {
    const mc = global.monstercat[e.channel.guild.id];
    if(!mc) return;
    if(e.user.id === process.env.DISCORD_CLIENT_ID) {
        mc.kill();
        delete global.monstercat[e.channel.guild.id];
        return;
    }

    const channel = e.channel.guild.voiceChannels.find(channel => channel.id === e.channel.id);
    if(!channel) return;
    if(channel.members.length > 1) return;
    mc.vc.startDisconnect();
}

module.exports = voiceChannelLeave;