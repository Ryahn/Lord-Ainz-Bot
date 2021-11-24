const { Schema, model } = require('mongoose'),
    config = require('../../config/config.json');

const Guild = new Schema({
    id: { type: String }, //ID of the guild
    registeredAt: { type: Number, default: Date.now() },
    prefix: { type: String, default: config.prefix },
    blacklisted: { type: Boolean, default: false },
    warn: { type: Boolean, default: false },
    owner: { type: String, default: null },

    addons: {
        type: Object,
        default: {
            // Extra features data
            welcome: {
                enabled: false, // Welcome features are enabled
                channel: null, // ID for the channel to send messages to
                message: null, // Custom message
                image: false, // Check if image is enabled
                embed: false, // Check if embed is enabled
            },
            goodbye: {
                enabled: false, // Goodbye features are enabled
                channel: null, // ID for channel to send messages to
                message: null, // Custom message
                image: false, // Check if image is enabled
                embed: false, // Check if embed is enabled
            },
        },
    },
});

module.exports = model('Guild', Guild, 'Guild');
