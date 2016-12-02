/**
 * Created by Will on 11/27/2016.
 */

const storage = require('../operators/storage');

function stats(msg, args)   {
    msg.reply(`**Guilds:** ${storage.client.Guilds.size} (playing in ${Object.keys(storage.monstercat).length})`)
}

module.exports = stats;