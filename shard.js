const { ShardingManager } = require('discord.js');
const config = require('./config/config.json');
const logger = require('./lib/logger/logger');
const chalk = require('chalk');

/**
 * @name ShardManager
 * @description Shard manager
 * @param token requires discord token
 * @param totalShards should be set to auto but can set max number
 */
const manager = new ShardingManager('./index-dev.js', {
    token: config.TOKEN,
    totalShards: 'auto',
});

// TODO: Add tracking of each shard with status

/**
 * @description logs out message on shard creation
 * @yields [info] 12-11-2021 09:20:57: [SHARD] [Fri Nov 12 2021 09:20:57] Launched shard #0/1
 * @todo Add tracking of each shard with status
 */
manager.on('shardCreate', async (shard) => {
    logger.info(
        `${chalk.blue('[SHARD]')} [${new Date()
            .toString()
            .split(' ', 5)
            .join(' ')}] Launched shard #${shard.id}/${manager.totalShards}`
    );
});

manager.spawn();
