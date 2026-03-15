const express = require('express');
const { register, login } = require('../controllers/authController');
const rateLimiter = require('../middleware/rateLimiter');

const router = express.Router();

router.use(rateLimiter);

router.post('/register', register);
router.post('/login', login);

module.exports = router;
