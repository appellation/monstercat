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

            const processor = ffmpeg(url)
                .inputFormat('hls')
                .audioFrequency(48000)
                .audioCodec('pcm_s16le')
                .format('s16le')
                .audioChannels(2)
                .on('error', console.error);

            this.dispatcher = this.conn.playConvertedStream(processor.pipe());
            return this.dispatcher;
        });
    }

    /**
     * Stop playing a Monstercat stream.
     * @return {undefined}
     */
    stop()  {
        this.dispatcher.end();
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
        if(member.voiceChannel) return member.voiceChannel.join();
        return Promise.reject();
    }
}

module.exports = Monstercat;