const commando = require('discord.js-commando');
const oneLine = require('common-tags').oneLine;

module.exports = class HelloCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'selam',
			aliases: ['naber'],
			group: 'pati',
			memberName: 'selam',
			description: 'Selam verir.',
			details: oneLine`
				Selam ver!
			`,
			examples: ['selam'],
		});
	}

	async run(msg, args) {
		return msg.reply(`sana da selam`);
	}
};