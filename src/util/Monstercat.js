/**
 * Created by Will on 1/23/2017.
 */

module.exports = class Monstercat {

    /**
     * @param {VoiceBroadcast} broadcaster
     * @constructor
     */
    constructor(broadcaster)   {

        /**
         * Maps guild IDs to stream dispatchers.
         * @type {Map.<String, StreamDispatcher>}
         */
        this.dispatchers = new Map();

        /**
         * The voice broadcaster.
         * @type {VoiceBroadcast}
         */
        this.broadcaster = broadcaster;
    }

    /**
     * Connect to a guild channel.
     * @param {GuildMember} member
     */
    connect(member) {
        if(!member || this.dispatchers.has(member.guild.id)) return;
        return Monstercat._checkConnection(member).then(conn => {
            this.dispatchers.set(member.guild.id, conn.playBroadcast(this.broadcaster));
        });
    }

    /**
     * Disconnect from a guild channel.
     * @param {Guild} guild
     */
    disconnect(guild)   {
        if(!guild || !this.dispatchers.has(guild.id)) return;
        const disp = this.dispatchers.get(guild.id);
        disp.player.voiceConnection.disconnect();
        disp.end();
        this.dispatchers.delete(guild.id);
    }

    /**
     * Check a guild member's connection.
     * @param {GuildMember} member
     * @return {Promise.<VoiceConnection>}
     * @private
     */
    static _checkConnection(member) {
        if(member.guild.voiceConnection) return Promise.resolve(member.guild.voiceConnection);
        if(member.voiceChannel) return member.voiceChannel.join();
        return Promise.reject();
    }
};