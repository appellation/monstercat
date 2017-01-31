/**
 * Created by Will on 1/23/2017.
 */

exports.func = res => {
    return res.send(`**Prefix all commands with a mention:** \`@Monstercat\`
- **join** - Join the current voice channel and play music.
- **leave** - Leave the current voice channel.`);
};