/**
 * Created by nelso on 11/24/2016.
 */

function voiceStateUpdate(oldM, newM) {
    if(!newM.voiceChannel) return;
    if(!newM.voiceChannel.connection) return;
    if(newM.voiceChannel.members.size !== 0)    {
        if(typeof newM.guild.connectionTimeout !== 'undefined') clearTimeout(newM.guild.connectionTimeout);
        return;
    }

    newM.guild.connectionTimeout = setTimeout(newM.voiceChannel.connection.disconnect, 15000);
}

module.exports = voiceStateUpdate;