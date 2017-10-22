import * as path from 'path';
import { ShardingManager } from 'discord.js';

const manager = new ShardingManager(path.resolve(__dirname, './Client.js'), { token: process.env.DISCORD_TOKEN });
manager.spawn();
