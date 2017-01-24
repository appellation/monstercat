/**
 * Created by Will on 1/23/2017.
 */

const Monstercat = require('../util/Monstercat');
const twitch = require('twitch-get-stream')(process.env.TWITCH_CLIENT_ID);
const ffmpeg = require('fluent-ffmpeg');
const Irc = require('node-irc');

const twitchURL = 'https://www.twitch.tv/monstercat';

module.exports = client => {
    const broadcaster = client.createVoiceBroadcast();
    twitch.get('monstercat').then(streams => {
        const stream =
            ffmpeg(streams.pop().url)
                .inputFormat('hls')
                .format('mp3');
        broadcaster.playStream(stream);
    });

    client.monstercat = new Monstercat(broadcaster);

    const ircClient = new Irc('irc.chat.twitch.tv', 6667, process.env.TWITCH_USERNAME, process.env.TWITCH_USERNAME, process.env.TWITCH_OAUTH_PASSWORD);
    ircClient.once('ready', () => {
        ircClient.join('#monstercat');
    });
    ircClient.on('CHANMSG', data => {
        if(data.receiver !== '#monstercat' || data.sender !== 'monstercat') return;

        let parsed = data.message.match(/^Now Playing: (.+) - Listen now: \S+ Tweet it: \S+$/);
        if(!parsed) return;
        parsed = parsed[1];

        client.user.setGame(parsed);
    });
    ircClient.connect();
};