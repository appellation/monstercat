/**
 * Created by nelso on 11/24/2016.
 */

function voiceStateUpdate(oldM, newM) {
    if(newM.voiceChannel && newM.voiceChannel.members.size > 1 && newM.voiceChannel.connection && typeof newM.guild.connectionTimeout !== 'undefined')    {
        clearTimeout(newM.guild.connectionTimeout);
        return;
    }

    if(!oldM.voiceChannel || !oldM.voiceChannel.connection || oldM.voiceChannel.members.size > 1 || !newM.guild.monstercat) return;

    newM.guild.connectionTimeout = setTimeout(() => {
        newM.guild.monstercat.stop();
        delete newM.guild.monstercat;
    }, 15000);
}

module.exports = voiceStateUpdate;