/**
 * Created by Will on 11/30/2016.
 */

class VC    {
    constructor(conn)   {
        this.conn = conn;
        this.disconnecting = false;
    }

    startDisconnect()   {
        console.log('starting disconnect');
        return new Promise(resolve => {
            if(this.timeout) return resolve();
            this.disconnecting = true;

            this.timeout = setTimeout(() => {
                this.conn.disconnect();
                return resolve();
            }, 15000);
        });
    }

    cancelDisconnect()  {
        if(this.timeout)    {
            clearTimeout(this.timeout);
            this.disconnecting = false;
        }
    }

    /**
     * Check voice connection.
     * @param {IGuildMember} member
     * @return {Promise.<IVoiceConnection>}
     */
    static check(member)  {
        const clientChannel = member.guild.voiceChannels.find(channel => channel.joined);
        if(typeof clientChannel !== 'undefined') return Promise.resolve(clientChannel.getVoiceConnectionInfo().voiceConnection);

        const memberChannel = member.getVoiceChannel();
        if(memberChannel) return memberChannel.join().then(info => info.voiceConnection).catch(err => Promise.reject());

        return Promise.reject();
    }
}

module.exports = VC;