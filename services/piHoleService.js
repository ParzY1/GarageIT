const axios = require('axios');

const fetchSummaryStatistics = async () => {
    try {
        const response = await axios.get(`${process.env.SERWER}/admin/api.php?summary&auth=${process.env.KLUCZ}`);
        if (response.status === 200 && response.data) {
            const data = response.data;
            return {
                dnsQueriesToday: data.dns_queries_today,
                adsBlockedToday: data.ads_blocked_today,
                adsPercentageToday: data.ads_percentage_today,
                domainsBlocked: data.domains_being_blocked,
            };
        } else {
            throw new Error('Failed to fetch data from Pi-hole API');
        }
    } catch (error) {
        throw new Error(`Error fetching summary statistics: ${error.message}`);
    }
};

const fetchTopItems = async () => {
    try {
        const response = await axios.get(`${process.env.SERWER}/admin/api.php?topItems&auth=${process.env.KLUCZ}`);
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error('Failed to fetch top items from Pi-hole API');
        }
    } catch (error) {
        throw new Error(`Error fetching top items: ${error.message}`);
    }
};

const fetchQuerySources = async () => {
    try {
        const response = await axios.get(`${process.env.SERWER}/admin/api.php?getQuerySources=100&auth=${process.env.KLUCZ}`);
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error('Failed to fetch query sources from Pi-hole API');
        }
    } catch (error) {
        throw new Error(`Error fetching query sources: ${error.message}`);
    }
};

const fetchStatus = async () => {
    try {
        const response = await axios.get(`${process.env.SERWER}/admin/api.php?auth=${process.env.KLUCZ}&status`);
        if (response.status === 200 && response.data) {
            return response.data;
        } else {
            throw new Error('Failed to fetch status from Pi-hole API');
        }
    } catch (error) {
        throw new Error(`Error fetching status: ${error.message}`);
    }
};

const filterQueriesFromLast24Hours = (queries) => {
    const last24Hours = Date.now() / 1000 - 24 * 60 * 60;
    return queries.filter(query => query[0] >= last24Hours);
};

module.exports = {
    fetchSummaryStatistics,
    fetchTopItems,
    fetchQuerySources,
    fetchStatus,
    filterQueriesFromLast24Hours,
};
