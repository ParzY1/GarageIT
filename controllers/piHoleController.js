const axios = require('axios');
const { fetchSummaryStatistics, filterQueriesFromLast24Hours } = require('../services/piHoleService');

const getSummaryStatistics = async (req, res) => {
    try {
        const stats = await fetchSummaryStatistics();
        res.json(stats);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getAllQueries = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.SERWER}/admin/api.php?getAllQueries&auth=${process.env.KLUCZ}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(`Error fetching queries: ${error.message}`);
    }
};

const getQueriesLast24Hours = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.SERWER}/admin/api.php?getAllQueries&auth=${process.env.KLUCZ}`);
        if (response.status === 200 && response.data) {
            const allQueries = response.data.data;
            const filteredQueries = filterQueriesFromLast24Hours(allQueries);
            res.json(filteredQueries);
        } else {
            throw new Error('Failed to fetch queries from Pi-hole API');
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

const getTopClients = async (req, res) => {
    try {
        const response = await axios.get(`${process.env.SERWER}/admin/api.php?auth=${process.env.KLUCZ}&topClients=10`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send(`Error fetching top clients: ${error.message}`);
    }
};

module.exports = {
    getSummaryStatistics,
    getAllQueries,
    getQueriesLast24Hours,
    getTopClients,
};
