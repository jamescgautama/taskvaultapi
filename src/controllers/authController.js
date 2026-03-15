const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

const register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({ success: false, message: 'name, email and password are required' });
        }

        const existingUser = User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'user already exists bro' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = {
            id: uuidv4(),
            email,
            name,
            password: hashedPassword
        };

        User.create(newUser);

        res.status(201).json({ success: true, message: 'user registered successfully!!!!', user: { id: newUser.id, email: newUser.email, name: newUser.name } });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'email and password are required' });
        }

        const user = User.findByEmail(email);
        if (!user) {
            return res.status(401).json({ success: false, message: 'wrong' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'wronger' });
        }

        const payload = {
            id: user.id,
            email: user.email
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ success: true, token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login
};
