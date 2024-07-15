const clientService = require('../services/clientService');
const auditService = require('../services/auditService');

const addClient = async (req, res) => {
    const { ip } = req.body;
    try {
        const result = await clientService.addClient(ip);
        await auditService.logAction('addClient', `Added client ${ip}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeClient = async (req, res) => {
    const { ip } = req.body;
    try {
        const result = await clientService.removeClient(ip);
        await auditService.logAction('removeClient', `Removed client ${ip}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addClientToGroup = async (req, res) => {
    const { ip, group } = req.body;
    try {
        const result = await clientService.addClientToGroup(ip, group);
        await auditService.logAction('addClientToGroup', `Added client ${ip} to group ${group}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeClientFromGroup = async (req, res) => {
    const { ip, group } = req.body;
    try {
        const result = await clientService.removeClientFromGroup(ip, group);
        await auditService.logAction('removeClientFromGroup', `Removed client ${ip} from group ${group}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    addClient,
    removeClient,
    addClientToGroup,
    removeClientFromGroup
};
