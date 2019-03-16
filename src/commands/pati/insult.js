//
//     patibot
//     paticik discord, http://forum.paticik.com
//
'use strict';

const Discord = require('discord.js');
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const tenor = require('lib/api/tenor');

module.exports = class InsultCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'hakaret',
			aliases: ['asagila', 'sov'],
			group: 'pati',
			memberName: 'hakaret',
			description: 'Belirtilen patiye hakaret eder.',
			details: oneLine`Canınızı sıkan patiye hakaret edip sövmek için rahat rahat kullanabilirsiniz.`,
			examples: ['!hakaret @amcik#1146'],
			guildOnly: true,
			args: [
				{
					key: 'member',
					label: 'user',
					prompt: 'Sövülecek kullanıcı',
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
		let gif = await tenor.gif('anime insult');

		// create a new embed.
		let embed = new Discord.RichEmbed()
			.setTitle(`${sender.username}, ${target.user.username}'a der ki:`)
			.setImage(gif.gif.url)
			.setColor('#FAA61A');

		// send it to channel.
		return channel.send(embed);
	}
};