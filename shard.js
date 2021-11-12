const { ShardingManager } = require("discord.js");
const config = require("./config/config");
const logger = require("./lib/logger/logger");
const chalk = require("chalk");

const manager = new ShardingManager("./index.js", {
    token: config.token,
    totalShards: "auto",
});

manager.on("shardCreate", async (shard) => {
    logger.info(
        `${chalk.blue("[SHARD]")} [${new Date()
            .toString()
            .split(" ", 5)
            .join(" ")}] Launched shard #${shard.id}/${manager.totalShards}`
    );
    // console.log(
    //     `[SHARD] [${new Date()
    //         .toString()
    //         .split(" ", 5)
    //         .join(" ")}] Launched shard #${shard.id}/${manager.totalShards}`
    // );
});

manager.spawn();
