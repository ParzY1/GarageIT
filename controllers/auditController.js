const auditService = require('../services/auditService');

const getLogs = async (req, res) => {
    try {
        const logs = await auditService.getLogs();
        res.json(logs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getLogs
};
