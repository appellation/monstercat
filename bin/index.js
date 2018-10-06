#!/bin/env/node
const { ShardingManager } = require('discord.js');
const path = require('path');

const manager = new ShardingManager(path.join(process.cwd(), 'bin', 'client.js'), { token: process.env.DISCORD_TOKEN });
manager.spawn();
