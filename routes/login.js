const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/user');
const winston = require('winston');
const path = require('path');

const logFilePath = path.join(__dirname, '../logs/auth.log');

// Define a logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: logFilePath }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple() 
    ),
    level: 'info', // Set the logging level to include info logs
});

// Shared utility function for handling responses and logging
function handleResponseAndLog(res, successMessage, errorMessage, logMessage) {
    if (successMessage) {
        res.status(200).send(successMessage);
        logger.info(logMessage);
    } else {
        res.status(400).send(errorMessage);
        logger.info(logMessage);
    }
}

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const timestamp = new Date();

    try {
        const user = await User.findOne({ username });

        if (!user) {
            handleResponseAndLog(res, null, 'Authentication failed', `Unsuccessfully Login Attempt From User : ${username}\non ${timestamp}`);
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            handleResponseAndLog(res, { username: user.username }, null, `Successfully Login Attempt From User : ${username}\non ${timestamp}`);
        } else {
            handleResponseAndLog(res, null, 'Authentication failed', `Unsuccessfully Login Attempt From User : ${username}\non ${timestamp}`);
        }
    } catch (error) {
        console.error('Error during login:', error);
        // Log the error
        logger.error(`Error during login: ${error.message} \nStack trace: ${error.stack} \non ${timestamp}`);
        res.status(500).send('Error during login');
    }
});

module.exports = router;
