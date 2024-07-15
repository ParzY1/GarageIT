const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuditLogSchema = new Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    action: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
