const { transports, createLogger, format } = require('winston');
/**
 * Logger Module
 * @name Logger
 * @module logger
 * @example const logger = require('./logger); logger.info('info message');
 * @output [info] 12-11-2021 09:20:57: info message
 */
const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        format.printf(
            (info) => `[${info.level}] ${info.timestamp}: ${info.message}`
        )
    ),
    transports: [
        new transports.Console({
            formatter(options) {
                return `${options.level} ${options.timestamp} ${options.message}`;
            },
        }),
    ],
});

module.exports = logger;
