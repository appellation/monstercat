import Client from '../src/Client';

if (!process.env.TWITCH_OAUTH_PASSWORD) throw new Error('Twitch OAuth password not specified');
if (!process.env.TWITCH_USERNAME) throw new Error('Twitch username not specified');
if (!process.env.DISCORD_TOKEN) throw new Error('No Discord token specified');
if (!process.env.TWITCH_CLIENT_ID) throw new Error('Twitch client ID not specified');

const client = new Client({
  ownerID: process.env.OWNER || '116690352584392704',
  clientID: process.env.DISCORD_CLIENT_ID || '251253454826110977',
  twitch: {
    oauth: process.env.TWITCH_OAUTH_PASSWORD,
    username: process.env.TWITCH_USERNAME,
  },
  redis: process.env.REDIS_URL || 'redis://redis:6379',
});
client.logger.info(`shard ${client.shard && client.shard.ids}`);
client.login(process.env.DISCORD_TOKEN).then(() => client.logger.info(`shard ${client.shard && client.shard.ids} ready`));
