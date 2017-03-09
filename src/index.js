require('dotenv').config();
const Commando = require('discord.js-commando');
const path = require('path');
const oneLine = require('common-tags').oneLine;
const sqlite = require('sqlite');

const client = new Commando.Client({
    owner: process.env.OWNER,
    invite: 'https://discord.gg/DPuaDvP',
    commandPrefix: 'mc!',
    unknownCommandResponse: false,
    disableEveryone: true,
    autoreconnect: true,
    fetch_all_members: true
});

client
	.once('ready', () => {
		console.log(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
		require('./handlers/init')(client);
	})
	.on('commandRun', (cmd, promise, msg, args) => {
		console.log(oneLine`${msg.author.username}#${msg.author.discriminator} (${msg.author.id})
			> ${msg.guild ? `${msg.guild.name} (${msg.guild.id})` : 'DM'}
			>> ${cmd.groupID}:${cmd.memberName}
			${Object.values(args)[0] !== '' ? `>>> ${Object.values(args)}` : ''}
		`);
	})
    .on('commandError', (cmd, err) => {
        if(err instanceof Commando.FriendlyError) return;
        console.log(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
    })
	.on('commandPrefixChange', (guild, prefix) => {
		console.log(oneLine`
			Prefix ${prefix === '' ? 'removed' : `changed to ${prefix || 'the default'}`}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('commandStatusChange', (guild, command, enabled) => {
		console.log(oneLine`
			Command ${command.groupID}:${command.memberName}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('groupStatusChange', (guild, group, enabled) => {
		console.log(oneLine`
			Group ${group.id}
			${enabled ? 'enabled' : 'disabled'}
			${guild ? `in guild ${guild.name} (${guild.id})` : 'globally'}.
		`);
	})
	.on('guildDelete', guild => {
		client.monstercat.disconnect(guild);
	});

client.setProvider(
	sqlite.open(path.join(__dirname, 'database.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

client.registry
    .registerGroups([
    	['info', 'Useful'],
    	['monstercat', 'Monstercat'],
        ['owner', 'Owner']
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'commands'));
    
client.login(process.env.DISCORD_TOKEN);
