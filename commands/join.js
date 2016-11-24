/**
 * Created by Will on 11/24/2016.
 */

const vc = require('../operators/voiceConnection');
function join(client, msg, args)    {
    vc.check(msg.guild, msg.member).then(conn => {
        const thing = new vc(conn);
        msg.guild.monstercat = thing;
        return thing.play();
    }).catch(console.error);
}

module.exports = join;