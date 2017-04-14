/**
 * Created by Will on 1/23/2017.
 */

const Monstercat = require('../util/Monstercat');
const Irc = require('node-irc');

const twitchURL = 'https://www.twitch.tv/monstercat';

module.exports = client => {
    checkBroadcaster(client);
    client.on('ready', () => checkBroadcaster(client));

    client.user.setGame('Monstercat', twitchURL);

    const ircClient = new Irc('irc.chat.twitch.tv', 6667, process.env.TWITCH_USERNAME, process.env.TWITCH_USERNAME, process.env.TWITCH_OAUTH_PASSWORD);
    ircClient.once('ready', () => {
        ircClient.join('#monstercat');
    });
    ircClient.on('CHANMSG', data => {
        if(data.receiver !== '#monstercat' || data.sender !== 'monstercat') return;

        let parsed = data.message.match(/^Now Playing: (.+) by (.+)/);
        if(!parsed) return;
        parsed = `${parsed[2].replace(/ - (Listen now: \S+ Tweet it: \S+|Listen on Spotify: \S+)$/, '')} - ${parsed[1]}`;

        client.user.setGame(parsed, twitchURL);
    });
    ircClient.connect();
};

function checkBroadcaster(client)  {
    if(!client.monstercat) client.monstercat = new Monstercat(client.createVoiceBroadcast());
    client.monstercat.initialize();
}
