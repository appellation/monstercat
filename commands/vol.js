/**
 * Created by Will on 11/24/2016.
 */

function vol(msg, args)    {
    if(!msg.guild.monstercat) return;
    const disp = msg.guild.monstercat.dispatcher;

    const count = parseFloat(args[0]);
    if(isNaN(count)) return;

    disp.setVolumeLogarithmic(count / 10);
}

module.exports = vol;