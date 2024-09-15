const mongoose = require('mongoose');

const TokenBlacklistSchema = new mongoose.Schema({
    token: { type: String, required: true },
    expiryDate: { type: Date, required: true }
});

TokenBlacklistSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });

const TokenBlacklist = mongoose.model('TokenBlacklist', TokenBlacklistSchema);
module.exports = TokenBlacklist;
