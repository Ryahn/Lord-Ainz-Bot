const { Schema, model } = require('mongoose');

const User = new Schema({
    id: { type: String },
    registeredAt: { type: Number, default: Date.now() },
});

module.exports = model('User', User, 'User');
