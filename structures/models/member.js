const { Schema, model } = require('mongoose');

const Member = new Schema({
    id: { type: String }, //ID of the user
    guild: { type: String }, //ID of the guild
    registeredAt: { type: Number, default: Date.now() },
});

module.exports = model('Member', Member, 'Member');
