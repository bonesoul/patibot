const commando = require('discord.js-commando');
const config = require('config');


module.exports = (async () => {
  const client = new commando.Client({
    owner: config.get('discord.clientid'),
    commandPrefix: '!'
  })

  console.dir(client.options);

  await client.login(config.get('discord.token'));
})();