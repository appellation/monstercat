/**
 * Created by Will on 1/23/2017.
 */

const twitch = require('twitch-get-stream')(process.env.TWITCH_CLIENT_ID);
const m3u8 = require('m3u8stream')
const { PassThrough } = require('stream');

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

        /**
         * The m3u8 stream from Twitch.
         */
        this.stream = null;
    }

    /**
     * Connect to a guild channel.
     * @param {GuildMember} member
     */
    connect(member) {
        if(!member || this.dispatchers.has(member.guild.id)) return;
        return Monstercat._checkConnection(member).then(conn => {
            const dispatcher = conn.playBroadcast(this.broadcaster);
            dispatcher.setVolumeLogarithmic(0.3);
            this.dispatchers.set(member.guild.id, dispatcher);
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

    initialize()  {
        if(this.broadcaster) this.broadcaster.end('initializing');

        this.broadcaster.once('end', () => {
            this.initialize();
        });

        this._startStream();
    }

    _startStream()  {
        twitch.get('monstercat').then(streams => {
            if(this.stream) this.stream.end();
            this.stream = m3u8(streams.pop().url);

            const stream = new PassThrough();
            this.stream.pipe(stream);
            this.broadcaster.playStream(stream);
        });
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
