const rateLimit = require('express-rate-limit');

const authRateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { success: false, message: 'Too many requests from this IP, please try again after 1 minute.' },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = authRateLimiter;
