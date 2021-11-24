const Sentry = require('@sentry/node'),
    config = require('./config/config.json'),
    { readFileSync } = require('fs'),
    pkgjson = require('./package.json'),
    LordAinz = require('./src/LordAinz');

Sentry.init({
    dsn: config.SENTRY.DSN,
    release: `${pkgjson.name}@${pkgjson.version}`,
    debug: config.SENTRY.DEBUG,
    environment: config.SENTRY.ENV,
    tracesSampleRate: config.SENTRY.RATE,
});

const OPTIONS = {
    fetchAllMembers: false,
    enableEveryone: false
};

console.log(readFileSync('./motd.txt', 'utf-8').toString());

const client = new LordAinz(OPTIONS);

client.on('debug', (...args) => client.logger.debug(...args));
client.on('rateLimit', (...args) => client.logger.info({ tag: 'rateLimit' }, ...args));

client.initialize();