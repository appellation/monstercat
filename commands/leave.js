/**
 * Created by Will on 11/24/2016.
 */

function leave(client, msg, args)   {
    if(!msg.guild.monstercat || !(msg.guild.monstercat instanceof require('../operators/monstercat'))) return;
    msg.guild.monstercat.stop();
    delete msg.guild.monstercat;
}

module.exports = leave;