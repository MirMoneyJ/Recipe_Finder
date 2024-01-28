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
    } else if (errorMessage) {
        res.status(400).send(errorMessage);
    }

    logger.info(logMessage);
}


router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const timestamp = new Date();

    try {
        if (!username || !password) {
            handleResponseAndLog(res, null, 'Authentication failed', `Username or Password is NULL:\non ${timestamp}`);
            return;
        }

        const user = await User.findOne({ username });
        if (!user) {
            handleResponseAndLog(res, null, 'Authentication failed', `User not found: ${username}\non ${timestamp}`);
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
            handleResponseAndLog(res, { username: user.username }, null, `Successfully Login Attempt From User : ${username}\non ${timestamp}`);
        } else {
            handleResponseAndLog(res, null, 'Authentication failed', `Incorrect password for User: ${username}\non ${timestamp}`);
        }

    } catch (error) {
        console.error('Error during login:', error);
        logger.error(`Error during login: ${error.message} \nStack trace: ${error.stack} \non ${timestamp}`);
        res.status(500).send('Error during login');
    }
});


module.exports = router;
