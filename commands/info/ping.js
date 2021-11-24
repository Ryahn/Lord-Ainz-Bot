const { MessageEmbed } = require('discord.js');
const Command = require('../../structures/Command');

module.exports = class Ping extends Command {
    constructor(...args) {
        super(...args, {
            name: 'ping',
            category: 'info',
            description: 'Shows The Ping Of The Bot',
            usage: '',
            accessableby: 'Everyone',
            slashCommand: false,
        });
    }

    async run(message, client, args) {
        try {
            const msg = await message.channel.send(`**Pinging...**`);
            const pingEmbed = new MessageEmbed()
                .setColor('GREEN')
                .setDescription(
                    `:hourglass_flowing_sand: ${
                        message.createdTimestamp - message.createdTimestamp
                    }\n💓 ${Math.round(this.bot.ws.ping)}`
                )
                .setTimestamp();
            await msg.delete();
            return await message.reply({ embeds: [pingEmbed] });
        } catch (error) {
            console.error(error);
            return message.reply(`An Error Occurred: \`${error.message}\`!`);
        }
    }
};
