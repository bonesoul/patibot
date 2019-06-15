//
//     patibot
//     paticik discord, http://forum.paticik.com
//
'use strict';

const commando = require('discord.js-commando');
const config = require('config');
const winston = require('winston');
const path = require('path');

module.exports = (async () => {
  const client = new commando.Client({
    owner: config.discord.clientid,
    commandPrefix: config.bot.prefix
  })

  client
    .on('error', console.error)
    .on('warn', console.warn)
    .on('debug', console.log)
    .on('ready', () => {
      winston.info(`Client ready; logged in as ${client.user.username}#${client.user.discriminator} (${client.user.id})`);
    })
    .on('disconnect', () => { console.warn('Disconnected!'); })
    .on('reconnecting', () => { console.warn('Reconnecting...'); })
    .on('commandError', (cmd, err) => {
      if(err instanceof commando.FriendlyError) return;
      console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
    })
    .on('commandBlocked', (msg, reason) => {
      console.log(oneLine`
        Command ${msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ''}
        blocked; ${reason}
      `);
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
    });

    client.registry
      .registerGroup('pati', 'Commands for pati')
      .registerDefaults()
      .registerTypesIn(path.join(__dirname, 'types'))
      .registerCommandsIn(path.join(__dirname, 'commands'));

  await client.login(config.discord.token);
})();