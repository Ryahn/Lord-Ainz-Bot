const LordAinz = require('./structures/LordAinz');
const config = require('./config/config.json');

const bot = new LordAinz(config);
bot.start();
