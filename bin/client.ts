import Client from '../src/Client';

if (!process.env.TWITCH_OAUTH_PASSWORD) throw new Error('Twith OAuth password not specified');
if (!process.env.TWITCH_USERNAME) throw new Error('Twitch username not specified');
if (!process.env.DISCORD_TOKEN) throw new Error('No Discord token specified');

const client = new Client({
  ownerID: process.env.OWNER || '116690352584392704',
  clientID: process.env.DISCORD_CLIENT_ID || '251253454826110977',
  twitch: {
    oauth: process.env.TWITCH_OAUTH_PASSWORD,
    username: process.env.TWITCH_USERNAME,
  },
  lavalink: {
    password: 'youshallnotpass',
    rest: process.env.LAVALINK_REST || 'http://lavalink:8081',
    ws: process.env.LAVALINK_WS || 'ws://lavalink:8080',
  },
  redis: process.env.REDIS_URL || 'redis://redis:6379',
});
console.log(`spawned shard ${client.shard!.ids}`);
client.login(process.env.DISCORD_TOKEN).then(() => console.log(`shard ${client.shard!.ids} ready`));
