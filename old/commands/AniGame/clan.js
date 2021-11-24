const tools = require('../../lib/tools/tools');
module.exports = {
    name: 'clanbattle',
    usage: [
        'Start a clan battle```{prefix}clanbattle @fighter1,@fighter1 numOfRounds```',
    ],
    enabled: true,
    aliases: ['cb', 'clanb', 'cbattle'],
    category: 'AniGame',
    memberPermissions: [],
    botPermissions: [
        'SEND_MESSAGES',
        'EMBED_LINKS',
        'MANAGE_MESSAGES',
        'READ_MESSAGE_HISTORY',
    ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data) {
        const phrases = [
            '**Fight Request ⚔️**',
            '**__PvP Challenge - AinzOoalGown VS Legend47__**',
        ];
        function multiSearchOr(text, searchWords) {
            if (text && searchWords) {
                var filteredText = text.match(/[^_\W]+/g);

                if (filteredText !== null) {
                    var lowerCaseText = filteredText.map(function (word) {
                        return word.toLowerCase();
                    });

                    for (var i = 0; i < searchWords.length; i++) {
                        if (
                            lowerCaseText.indexOf(
                                searchWords[i].toLowerCase()
                            ) === -1
                        ) {
                            return false;
                        }
                    }

                    return true;
                }

                return false;
            }

            return 'Error: Props are missing';
        }

        try {
            if (!args[0] & !args[1])
                return message.reply({
                    content: 'please state `@fighter1,@fighter2` numOfRounds',
                    allowedMentions: { repliedUser: false },
                });

            console.log(tools.resolveMember(args[0]));

            // send the message and wait for it to be sent
            const confirmation = await message.channel.send(
                `Start battle! Be sure to use \`.dg fight @user\`. If you are unsure who to fight, please contact a referee.`
            );
            // filter checks if the response is from the author who typed the command
            // const filter = (m) => m.author.id === message.author.id;
            // set up a message collector to check if there are any responses
            const collector = confirmation.channel.createMessageCollector(
                // filter,
                {
                    // set up the max wait time the collector runs (optional)
                    time: 60000,
                }
            );

            // // fires when a response is collected
            collector.on('collect', async (msg) => {
                msg.embeds.forEach((embed) => {
                    if (multiSearchOr(embed.title, phrases)) {
                        console.log(msg.channel.content);
                    }
                });
                // console.log(msg);
            });

            // // fires when the collector is finished collecting
            collector.on('end', (collected, reason) => {
                // only send a message when the "end" event fires because of timeout
                if (reason === 'time') {
                    message.channel.send(
                        `${message.author}, it's been a minute without a battle. Please start a new battle.`
                    );
                }
            });
            // });
        } catch (err) {
            client.logger.error(
                `Ran into an error while executing ${data.cmd.name}`
            );
            console.log(err);
            return client.embed.send(message, {
                description: `An issue has occured while running the command. If this error keeps occuring please contact our development team.`,
                color: `RED`,
                author: {
                    name: `Uh Oh!`,
                    icon_url: `${message.author.displayAvatarURL()}`,
                    url: '',
                },
            });
        }
    },
};
