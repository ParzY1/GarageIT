const rateLimitWindowMs = 15 * 60 * 1000;
const maxRequests = 100;
const userRequests = {};

const rateLimiter = (req, res, next) => {
    const userId = req.user ? req.user.id : req.ip;
    const currentTime = Date.now();

    if (!userRequests[userId]) {
        userRequests[userId] = { count: 1, startTime: currentTime };
    } else {
        const elapsedTime = currentTime - userRequests[userId].startTime;

        if (elapsedTime < rateLimitWindowMs) {
            userRequests[userId].count += 1;

            if (userRequests[userId].count > maxRequests) {
                return res.status(429).json({
                    message: "Too many requests, please try again later.",
                });
            }
        } else {
            userRequests[userId] = { count: 1, startTime: currentTime };
        }
    }

    next();
};

setInterval(() => {
    const currentTime = Date.now();
    for (const userId in userRequests) {
        if (currentTime - userRequests[userId].startTime > rateLimitWindowMs) {
            delete userRequests[userId];
        }
    }
}, rateLimitWindowMs);

module.exports = rateLimiter;