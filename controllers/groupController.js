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

const getGroups = async (req, res) => {
    try {
        const result = await groupService.getGroups();
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const enableGroup = async (req, res) => {
    const { name } = req.body;
    try {
        const result = await groupService.enableGroup(name);
        await auditService.logAction('enableGroup', `Enabled group ${name}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const disableGroup = async (req, res) => {
    const { name } = req.body;
    try {
        const result = await groupService.disableGroup(name);
        await auditService.logAction('disableGroup', `Disabled group ${name}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editGroupName = async (req, res) => {
    const { oldName, newName } = req.body;
    try {
        const result = await groupService.editGroupName(oldName, newName);
        await auditService.logAction('editGroupName', `Changed group name from ${oldName} to ${newName}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editGroupDescription = async (req, res) => {
    const { name, description } = req.body;
    try {
        const result = await groupService.editGroupDescription(name, description);
        await auditService.logAction('editGroupDescription', `Updated description for group ${name}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addGroup,
    deleteGroup,
    getGroups,
    enableGroup,
    disableGroup,
    editGroupName,
    editGroupDescription
}
