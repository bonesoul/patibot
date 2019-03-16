const Discord = require('discord.js');
const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const tenor = require('lib/api/tenor');

module.exports = class HelloCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'tokat',
			aliases: ['kaphe', 'suslan'],
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
		const target = args.member;
		let gif = await tenor.gif('anime slap');

		console.dir(msg);

		let embed = new Discord.RichEmbed()
			.setTitle(`Bonesoul, ${target.user.username}'a tokadı basar:`)
			.setDescription('Sus lan kaphe!')
			.setImage(gif.gif.url)
			.setColor('#0099ff');

		return msg.replyEmbed(embed);
	}
};