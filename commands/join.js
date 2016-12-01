/**
 * Created by Will on 11/24/2016.
 */

const mc = require('../operators/monstercat');
const vc = require('../operators/vc');

function join(msg, args)    {
    if(global.monstercat[msg.guild.id]) return;

    vc.check(msg.member).then(conn => {
        const thing = new mc(conn);
        global.monstercat[msg.guild.id] = thing;
        return thing.play();
    }).catch(console.error);
}

module.exports = join;