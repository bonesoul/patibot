const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;
const tenor = require('lib/api/tenor');

module.exports = class HelloCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'tokat',
			aliases: ['vur'],
			group: 'pati',
			memberName: 'tokat',
			description: 'Belirtilen patiye tokadı basar.',
			details: oneLine`
				Tokat
			`,
			examples: ['tokat bonesoul'],
		});
	}

	async run(msg, args) {
		let test = await tenor.gif('anime slap');
		console.dir(test);
		return msg.reply(`sana da selam`);
	}
};