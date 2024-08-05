const settingsService = require('../services/settingsService');
const VALID_DNS_SERVERS = require('../utils/dnsServers');

const getDNSPriority = (dnsServer) => VALID_DNS_SERVERS.indexOf(dnsServer);

const getDNSMasqListening = async (req, res) => {
    try {
        const value = await settingsService.getSetting('DNSMASQ_LISTENING');
        res.json({ success: true, value });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const setDNSMasqListening = async (req, res) => {
    const { value } = req.body;
    if (!['local', 'single', 'bind', 'all'].includes(value)) {
        return res.status(400).json({ error: 'Invalid value for DNSMASQ_LISTENING' });
    }

    try {
        await settingsService.setSetting('DNSMASQ_LISTENING', value);
        res.json({ success: true, message: `DNSMASQ_LISTENING set to ${value}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDNSFQDNRequired = async (req, res) => {
    try {
        const value = await settingsService.getSetting('DNS_FQDN_REQUIRED');
        res.json({ success: true, value });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const setDNSFQDNRequired = async (req, res) => {
    const { value } = req.body;
    if (!['true', 'false'].includes(value)) {
        return res.status(400).json({ error: 'Invalid value for DNS_FQDN_REQUIRED' });
    }

    try {
        await settingsService.setSetting('DNS_FQDN_REQUIRED', value);
        res.json({ success: true, message: `DNS_FQDN_REQUIRED set to ${value}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDNSBogusPriv = async (req, res) => {
    try {
        const value = await settingsService.getSetting('DNS_BOGUS_PRIV');
        res.json({ success: true, value });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const setDNSBogusPriv = async (req, res) => {
    const { value } = req.body;
    if (!['true', 'false'].includes(value)) {
        return res.status(400).json({ error: 'Invalid value for DNS_BOGUS_PRIV' });
    }

    try {
        await settingsService.setSetting('DNS_BOGUS_PRIV', value);
        res.json({ success: true, message: `DNS_BOGUS_PRIV set to ${value}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDNSSEC = async (req, res) => {
    try {
        const value = await settingsService.getSetting('DNSSEC');
        res.json({ success: true, value });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const setDNSSEC = async (req, res) => {
    const { value } = req.body;
    if (!['true', 'false'].includes(value)) {
        return res.status(400).json({ error: 'Invalid value for DNSSEC' });
    }

    try {
        await settingsService.setSetting('DNSSEC', value);
        res.json({ success: true, message: `DNSSEC set to ${value}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getDNSServers = async (req, res) => {
    try {
        const dns1 = await settingsService.getSetting('PIHOLE_DNS_1');
        const dns2 = await settingsService.getSetting('PIHOLE_DNS_2');
        res.json({ success: true, dns1, dns2 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const setDNSServers = async (req, res) => {
    const { dns1, dns2 } = req.body;
    if (!VALID_DNS_SERVERS.includes(dns1) || !VALID_DNS_SERVERS.includes(dns2)) {
        return res.status(400).json({ error: 'Invalid value for DNS servers' });
    }

    try {
        const dns1Priority = getDNSPriority(dns1);
        const dns2Priority = getDNSPriority(dns2);

        let firstDNS, secondDNS;
        if (dns1Priority < dns2Priority) {
            firstDNS = dns1;
            secondDNS = dns2;
        } else {
            firstDNS = dns2;
            secondDNS = dns1;
        }

        await settingsService.setSetting('PIHOLE_DNS_1', firstDNS);
        await settingsService.setSetting('PIHOLE_DNS_2', secondDNS);

        res.json({ success: true, message: `DNS servers set. PIHOLE_DNS_1: ${firstDNS}, PIHOLE_DNS_2: ${secondDNS}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPrivacyLevel = async (req, res) => {
    try {
        const value = await settingsService.getFTLSetting('PRIVACYLEVEL');
        res.json({ success: true, value });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const setPrivacyLevel = async (req, res) => {
    const { value } = req.body;
    if (!['0', '1', '2', '3'].includes(value)) {
        return res.status(400).json({ error: 'Invalid value for PRIVACYLEVEL' });
    }

    try {
        await settingsService.setFTLSetting('PRIVACYLEVEL', value);
        res.json({ success: true, message: `PRIVACYLEVEL set to ${value}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRateLimit = async (req, res) => {
    try {
        const value = await settingsService.getFTLSetting('RATE_LIMIT');
        res.json({ success: true, value });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const setRateLimit = async (req, res) => {
    const { value } = req.body;
    const regex = /^[0-9]+\/[0-9]+$/;
    if (!regex.test(value)) {
        return res.status(400).json({ error: 'Invalid value for RATE_LIMIT. Format should be {query_count}/{seconds}' });
    }

    try {
        await settingsService.setFTLSetting('RATE_LIMIT', value);
        res.json({ success: true, message: `RATE_LIMIT set to ${value}` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getDNSMasqListening,
    setDNSMasqListening,
    getDNSFQDNRequired,
    setDNSFQDNRequired,
    getDNSBogusPriv,
    setDNSBogusPriv,
    getDNSSEC,
    setDNSSEC,
    getDNSServers,
    setDNSServers,
    getPrivacyLevel,
    setPrivacyLevel,
    getRateLimit,
    setRateLimit
};