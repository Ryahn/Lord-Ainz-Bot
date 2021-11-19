let { connect, Promise, connection } = require("mongoose");
const logger = require("../lib/logger/logger");
const chalk = require("chalk");
const config = require("../config/config.json");

module.exports = {
    init: () => {
        const dbOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
            family: 4,
            maxPoolSize: 5,
            connectTimeoutMS: 10000,
        };

        connect(config.MONGOOSE, dbOptions);
        Promise = global.Promise;

        connection.on("connected", () => {
            logger.info(
                `${chalk.magentaBright(
                    "[DATABASE]"
                )} Connected to MongoDB Successfully!`
            );
        });

        connection.on("err", (err) => {
            logger.error(
                `${chalk.magentaBright(
                    "[DATABASE]"
                )} Error Occured From MongoDB: \n${err.message}`
            );
        });

        connection.on("disconnected", () => {
            logger.warn(
                `${chalk.magentaBright("[DATABASE]")} Connection Disconnected!`
            );
        });
    },
};
