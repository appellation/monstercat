/**
 * Created by Will on 11/27/2016.
 */

function stats(client, msg, args)   {
    if(msg.author.id !== '116690352584392704') return;
    let out = `**Guilds:** ${client.guilds.size} (playing in \`${client.guilds.map(guild => guild.monstercat ? 1 : 0).reduce((accum, cur) => accum + cur)}\`)`;
    msg.channel.sendMessage(out);
}

module.exports = stats;