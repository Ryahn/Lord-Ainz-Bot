module.exports = class Command {
    constructor(bot, name, options = {}) {
        this.bot = bot;
        this.name = options.name || name;
        this.description = options.description || 'No Description';
        this.category = options.category;
        this.usage = options.usage;
        this.access = options.access || 'Everyone';
        this.slashCommand = options.slashCommand || false;
        this.buttonCommand = options.buttonCommand || [];
        this.commandOptions = options.commandOptions || [];
    }

    async run(message, client, args) {
        throw new Error(`Command ${this.name} doesn't provide a run method!`);
    }

    async interactionRun(interaction) {
        throw new Error(
            `InterationCommand ${this.name} doesn't provide a run method!`
        );
    }
};
