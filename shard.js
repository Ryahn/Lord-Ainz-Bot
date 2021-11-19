const { ShardingManager } = require("discord.js");
const config = require("./config/config.json");
const logger = require("./lib/logger/logger");
const chalk = require("chalk");

// Create sharding manager and pass in token
// totalShards recommends using auto
const manager = new ShardingManager("./index-dev.js", {
    token: config.token,
    totalShards: "auto",
});

// Logs out [info] 12-11-2021 09:20:57: [SHARD] [Fri Nov 12 2021 09:20:57] Launched shard #0/1
// TODO: Add tracking of each shard with status
manager.on("shardCreate", async (shard) => {
    logger.info(
        `${chalk.blue("[SHARD]")} [${new Date()
            .toString()
            .split(" ", 5)
            .join(" ")}] Launched shard #${shard.id}/${manager.totalShards}`
    );
});

manager.spawn();
