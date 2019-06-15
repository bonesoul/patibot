//
//     patibot
//     paticik discord, http://forum.paticik.com
//
'use strict';

const Discord = require('discord.js');
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const tenor = require('lib/api/tenor');

module.exports = class SlapCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'tokat',
			aliases: ['kahpe', 'suslan'],
			group: 'pati',
			memberName: 'tokat',
			description: 'Belirtilen patiye tokadı basar.',
			details: oneLine`Amcık amcık konuşan patiye tokadı basmak için kullanılır.`,
			examples: ['!tokat @amcik#1146'],
			guildOnly: true,
			args: [
				{
					key: 'member',
					label: 'user',
					prompt: 'Tokatın vurulacağı kullanıcı',
					type: 'member'
				}
			]
		});
	}

	async run(msg, args) {
		const sender = msg.message.author; // the command sender.
		const target = args.member; // the target user.
		const channel = msg.message.channel; // the channel action takes in.

		// get a slap gif.
		let gif = await tenor.gif('anime slap');

		// create a new embed.
		let embed = new Discord.RichEmbed()
			.setTitle(`${sender.username}, ${target.user.username}'a tokadı basar:`)
			.setDescription('Sus lan kahpe!')
			.setImage(gif.gif.url)
			.setColor('#FAA61A');

		// send it to channel.
		return channel.send(embed);
	}
};