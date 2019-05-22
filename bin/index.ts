#!/bin/env/node
import { ShardingManager } from 'discord.js';
import * as path from 'path';

const manager = new ShardingManager(path.join(process.cwd(), 'bin', 'client.js'), { token: process.env.DISCORD_TOKEN });
manager.spawn();
