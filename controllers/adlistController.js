const adlistService = require('../services/adlistService');

const getAdlists = async (req, res) => {
    try {
        const adlists = await adlistService.getAdlists();
        res.json(adlists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addAdlist = async (req, res) => {
    const { address, comment } = req.body;
    try {
        const adlist = await adlistService.addAdlist(address, comment);
        res.json(adlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeAdlist = async (req, res) => {
    const { address } = req.body;
    try {
        const adlist = await adlistService.removeAdlist(address);
        res.json(adlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editAdlistAddress = async (req, res) => {
    const { oldAddress, newAddress } = req.body;
    try {
        const adlist = await adlistService.editAdlistAddress(oldAddress, newAddress);
        res.json(adlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editAdlistComment = async (req, res) => {
    const { address, comment } = req.body;
    try {
        const adlist = await adlistService.editAdlistComment(address, comment);
        res.json(adlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const enableAdlist = async (req, res) => {
    const { address } = req.body;
    try {
        const adlist = await adlistService.enableAdlist(address);
        res.json(adlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const disableAdlist = async (req, res) => {
    const { address } = req.body;
    try {
        const adlist = await adlistService.disableAdlist(address);
        res.json(adlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addAdlistToGroup = async (req, res) => {
    const { address, group } = req.body;
    try {
        const adlist = await adlistService.addAdlistToGroup(address, group);
        res.json(adlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeAdlistFromGroup = async (req, res) => {
    const { address, group } = req.body;
    try {
        const adlist = await adlistService.removeAdlistFromGroup(address, group);
        res.json(adlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAdlistGroups = async(req, res) => {
    const { address } = req.body;
    try {
        const adlist = await adlistService.getAdlistGroups(address);
        res.json(adlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAdlists,
    addAdlist,
    removeAdlist,
    editAdlistAddress,
    editAdlistComment,
    enableAdlist,
    disableAdlist,
    addAdlistToGroup,
    removeAdlistFromGroup,
    getAdlistGroups
};