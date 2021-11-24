const chalk = require('chalk'),
    logger = require('../lib/logger/logger');

const Event = require('../structures/Event');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            once: true,
        });
    }

    run() {
        try {
            this.bot.user.setActivity(`For ${this.bot.prefix}`, {
                type: 'WATCHING',
            });
            logger.info(
                `${chalk.greenBright('[BOT]')} Ready to conqure the world!`
            );
        } catch (error) {
            console.error(error);
        }
    }
};
