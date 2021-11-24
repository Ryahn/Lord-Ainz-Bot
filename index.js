const Discord = require('discord.js'),
    client = new Discord.Client({
        intents: [
            'GUILDS',
            'GUILD_MEMBERS',
            'GUILD_MESSAGES',
            'DIRECT_MESSAGES',
        ],
    }),
    fs = require('fs'),
    mongoose = require('mongoose'),
    util = require('util'),
    readdir = util.promisify(fs.readdir),
    config = require('./config/config'),
    chalk = require('chalk');

client.setMaxListeners(0);
client.event = new Discord.Collection();
client.commands = new Discord.Collection();
client.config = config;
client.Database = require('./lib/database/mongoose.js');
client.tools = require('./lib/tools/tools');
client.logger = require('./lib/logger/logger');
client.embed = require('./lib/embed/embed');

async function init() {
    const eventFiles = fs
        .readdirSync('./events')
        .filter((file) => file.endsWith('.js'));

    for (const file of eventFiles) {
        const event = require(`./events/${file}`);
        const eventName = file.split('.')[0];
        client.logger.info(`${chalk.cyan('[EVENT]')} Loading... ${eventName}`);
        client.on(eventName, event.bind(null, client));
    }

    const folders = await readdir('./commands/');
    folders.forEach((direct) => {
        const commandFiles = fs
            .readdirSync('./commands/' + direct + '/')
            .filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`./commands/${direct}/${file}`);
            const fileName = file.split('.')[0];
            client.logger.info(
                `${chalk.cyanBright(
                    '[COMMAND]'
                )} Loading... ${direct}/${fileName}`
            );
            client.commands.set(command.name, command);
        }
    });

    mongoose
        .connect(config.mongoose, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            client.logger.info(
                `${chalk.magentaBright('[DATABASE]')} Connected!`
            );
        })
        .catch((err) => {
            client.logger.error(
                `Unable to connect to databaase. Error: ${err}`
            );
        });

    await client.login(config.token);
}

init();

process.on('unhandledRejection', (err) => {
    console.log('Unknown error occured:\n');
    console.log(err);
});
