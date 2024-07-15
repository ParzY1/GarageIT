const domainService = require('../services/domainService');
const auditService = require('../services/auditService');

const addToBlacklist = async (req, res) => {
    const { domain } = req.body;
    try {
        const result = await domainService.addToBlacklist(domain);
        await auditService.logAction('addToBlacklist', `Added ${domain} to blacklist`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addToWhitelist = async (req, res) => {
    const { domain } = req.body;
    try {
        const result = await domainService.addToWhitelist(domain);
        await auditService.logAction('addToWhitelist', `Added ${domain} to whitelist`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeFromBlacklist = async (req, res) => {
    const { domain } = req.body;
    try {
        const result = await domainService.removeFromBlacklist(domain);
        await auditService.logAction('removeFromBlacklist', `Removed ${domain} from blacklist`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeFromWhitelist = async (req, res) => {
    const { domain } = req.body;
    try {
        const result = await domainService.removeFromWhitelist(domain);
        await auditService.logAction('removeFromWhitelist', `Removed ${domain} from whitelist`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const enableDomain = async (req, res) => {
    const { domain } = req.body;
    try {
        const result = await domainService.enableDomain(domain);
        await auditService.logAction('enableDomain', `Enabled ${domain}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const disableDomain = async (req, res) => {
    const { domain } = req.body;
    try {
        const result = await domainService.disableDomain(domain);
        await auditService.logAction('disableDomain', `Disabled ${domain}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addDomainToGroup = async (req, res) => {
    const { domain, group } = req.body;
    try {
        const result = await domainService.addDomainToGroup(domain, group);
        await auditService.logAction('addDomainToGroup', `Added ${domain} to group ${group}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeDomainFromGroup = async (req, res) => {
    const { domain, group } = req.body;
    try {
        const result = await domainService.removeDomainFromGroup(domain, group);
        await auditService.logAction('removeDomainFromGroup', `Removed ${domain} from group ${group}`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeFromDomainList = async (req, res) => {
    const { domain } = req.body;
    try {
        const result = await domainService.removeFromDomainList(domain);
        await auditService.logAction('removeFromDomainList', `Removed ${domain} from list`);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const changeDomainListType = async (req, res) => {
    const { domain } = req.body;
    try{
        const result = await domainService.changeDomainListType(domain);
        await auditService.logAction('changeDomainListType', `Changed ${domain} list type`);
        res.json(result);
    } catch(error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addToBlacklist,
    addToWhitelist,
    removeFromBlacklist,
    removeFromWhitelist,
    enableDomain,
    disableDomain,
    addDomainToGroup,
    removeDomainFromGroup,
    removeFromDomainList,
    changeDomainListType
};
