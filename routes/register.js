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
            handleResponseAndLog(res, null, 'Invalid data provided for registration', `Invalid data for registration attempt\non ${timestamp}`);
            return;
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            handleResponseAndLog(res, null, 'Username already exists', `Username already exists for User : ${username}\non ${timestamp}`);
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before saving it to the database
        const newUser = new User({ username, password: hashedPassword });       
        await newUser.save(); // Save the user to the database
        handleResponseAndLog(res, 'User registered successfully', null, `User Registered Successfully: ${username}\non ${timestamp}`);

    } catch (error) {
        // Log the error
        logger.error(`Error during registration: ${error.message} \nStack trace: ${error.stack} \non ${timestamp}`);
        res.status(500).send('Error registering user');
    } 
});

module.exports = router;
