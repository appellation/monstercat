/**
 * Created by Will on 11/24/2016.
 */

function leave(msg, args)   {
    const mc = global.monstercat[msg.guild.id];
    if(!mc || !(mc instanceof require('../operators/monstercat'))) return;
    mc.stop();
    delete global.monstercat[msg.guild.id];
}

module.exports = leave;