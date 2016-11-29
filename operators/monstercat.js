/**
 * Created by Will on 11/23/2016.
 */

const twitch = require('twitch-get-stream')(process.env.TWITCH_CLIENT_ID);
const ffmpeg = require('fluent-ffmpeg');
const pass = require('stream').PassThrough;

/**
 * @type {Promise.<PassThrough>}
 */
const mcStream = twitch.rawParsed('monstercat').then(streams => {
    const url = streams.pop().file;
    const out = new pass;

    ffmpeg(url)
        .inputFormat('hls')
        .audioFrequency(48000)
        .audioCodec('libopus')
        .format('opus')
        .audioChannels(2)
        .on('error', err => void err)
        .pipe(out);

    return out;
});

class Monstercat   {

    /**
     * @constructor
     * @param {IVoiceConnection} conn
     */
    constructor(conn)   {
        this.conn = conn;
    }

    /**
     * Play a Monstercat stream.
     * @return {Promise.<AudioEncoderStream>}
     */
    play()  {
        this.stream = new pass;
        return mcStream.then(stream => {
            stream.pipe(this.stream);
            this.encoder = this.conn.createExternalEncoder({
                type: 'OggOpusPlayer',
                source: this.stream
            });
            this.encoder.play();
            return this.encoder;
        });
    }

    /**
     * Stop playing a Monstercat stream.
     * @return {undefined}
     */
    stop()  {
        if(this.encoder) this.encoder.stop();
        return this.conn.disconnect();
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

module.exports = Monstercat;