/**
 * Created by Will on 11/24/2016.
 */

const storage = require('../operators/storage');

function vol(msg, args)    {
    const mc = storage.monstercat[msg.guild.id];
    if(!mc) return;

    const count = parseFloat(args[0]);
    if(isNaN(count)) return;

    disp.setVolumeLogarithmic(count / 10);
}

module.exports = vol;