const groupService = require('../services/groupService');
const auditService = require('../services/auditService');

const addGroup = async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = await groupService.addGroup(name, description);
        await auditService.logAction('addGroup', `Added group ${name}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteGroup = async (req, res) => {
    const { name } = req.body;
    try {
        const result = await groupService.deleteGroup(name);
        await auditService.logAction('deleteGroup', `Deleted group ${name}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addGroup,
    deleteGroup
};
