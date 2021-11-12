const chalk = require("chalk"),
    logger = require("../lib/logger/logger");

module.exports = async (client) => {
    logger.info(`${chalk.greenBright("[BOT]")} Ready to conqure the world!`);
    client.user.setPresence({
        activity: { name: "for $$", type: "WATCHING" },
        status: "online",
    });
};
