/**
 * Created by Will on 11/23/2016.
 */

const twitch = require('twitch-get-stream')(process.env.TWITCH_CLIENT_ID);
const ffmpeg = require('fluent-ffmpeg');

class Monstercat   {

    /**
     *
     * @param {VoiceConnection} conn
     */
    constructor(conn)   {
        this.conn = conn;
    }

    /**
     * Play a Monstercat stream.
     * @return {Promise.<undefined>}
     */
    play()  {
        return twitch.rawParsed('monstercat').then(streams => {
            const url = streams.pop().file;

            this.processor = ffmpeg(url)
                .inputFormat('hls')
                .audioFrequency(48000)
                .audioCodec('pcm_s16le')
                .format('s16le')
                .audioChannels(2)
                .on('error', err => void err);

            this.dispatcher = this.conn.playConvertedStream(this.processor.pipe());
            this.dispatcher.setVolume(0.25);
            return this.dispatcher;
        });
    }

    /**
     * Stop playing a Monstercat stream.
     * @return {undefined}
     */
    stop()  {
        if(this.stream) this.stream.end();
        if(this.dispatcher) this.dispatcher.end();
        return this.conn.disconnect();
    }

    /**
     * Check voice connection.
     * @param guild
     * @param member
     * @return {*}
     */
    static check(guild, member)  {
        if(guild.voiceConnection) return Promise.resolve(guild.voiceConnection);
        if(member.voiceChannel) return member.voiceChannel.join().catch(err => Promise.reject());
        return Promise.reject();
    }
}

module.exports = Monstercat;