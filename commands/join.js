/**
 * Created by Will on 11/24/2016.
 */

const mc = require('../operators/monstercat');
const vc = require('../operators/vc');
const storage = require('../operators/storage');

function join(msg, args)    {
    if(storage.monstercat.has(msg.guild.id)) return;

    vc.check(msg.member).then(conn => {
        const thing = new mc(conn);
        storage.monstercat.set(msg.guild.id, thing);
        return thing.play();
    }).catch(console.error);
}

module.exports = join;