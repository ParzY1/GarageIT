const AuditLog = require('../models/AuditLog');

const logAction = async (action, details) => {
    try {
        const newLog = new AuditLog({ action, details });
        await newLog.save();
        return { success: true, message: 'Action logged successfully' };
    } catch (error) {
        throw new Error('Failed to log action', error.message);
    }
};

module.exports = {
    logAction,
};
