require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const { stream } = require('./middleware/logger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream }));

app.use('/auth', authRoutes);
app.use('/user', userRoutes);

app.use(errorHandler);

module.exports = app;
