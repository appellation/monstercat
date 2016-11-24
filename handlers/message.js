/**
 * Created by Will on 11/23/2016.
 */

const commands = {
    join: require('../commands/join'),
    leave: require('../commands/leave')
};

function message(msg)   {
    const parsed = msg.content.split(' ');
    if(msg.author.bot) return;
    if(typeof commands[parsed[0]] !== 'function') return;
    commands[parsed[0]](msg.client, msg, parsed.slice(1));
}

module.exports = message;