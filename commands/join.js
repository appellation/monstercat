/**
 * Created by Will on 11/24/2016.
 */

const mc = require('../operators/monstercat');
function join(msg, args)    {
    if(msg.guild.monstercat) return;

    mc.check(msg.guild, msg.member).then(conn => {
        const thing = new mc(conn);
        msg.guild.monstercat = thing;
        return thing.play();
    }).catch(console.error);
}

module.exports = join;