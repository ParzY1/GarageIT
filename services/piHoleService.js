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

const filterQueriesFromLast24Hours = (queries) => {
    const last24Hours = Date.now() / 1000 - 24 * 60 * 60;
    return queries.filter(query => query[0] >= last24Hours);
};

module.exports = {
    fetchSummaryStatistics,
    filterQueriesFromLast24Hours,
};
