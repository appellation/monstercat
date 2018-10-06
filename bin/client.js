const { default: Client } = require('../dist/Client');
const client = new Client({
  ownerID: process.env.OWNER,
  clientID: process.env.DISCORD_CLIENT_ID,
  twitch: {
    oauth: process.env.TWITCH_OAUTH_PASSWORD,
    username: process.env.TWITCH_USERNAME,
  },
  lavalink: {
    password: 'youshallnotpass',
    rest: process.env.LAVALINK_REST || 'http://lavalink:8081',
    ws: process.env.LAVALINK_WS || 'ws://lavalink:8080',
  }
});
console.log(`spawned shard ${client.shard.id}`);
client.login(process.env.DISCORD_TOKEN).then(() => console.log(`shard ${client.shard.id} ready`));
