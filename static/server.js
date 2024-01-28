const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fetchRecipeRoute = require('../routes/fetchRecipe');
const complexSearchRoute = require('../routes/complexSearch');
const authRoutes = require('../routes/auth');
require('dotenv').config({ path: path.join(__dirname, '../key.env') }); // Load the value from key.env

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = process.env.DB_PATH || 'mongodb://127.0.0.1:27017/SpoonacularAPI_DB';

app.set('view engine', 'ejs');
mongoose.connect(DB_PATH);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public'))); // Uses static file from public directory
app.use(express.static(path.join(__dirname, '../scripts')));
app.use(express.static(path.join(__dirname, '../styles')));

// Points to the routing scripts
app.use('/fetchRecipe', fetchRecipeRoute);
app.use('/complexSearch', complexSearchRoute);
app.use('/auth', authRoutes);

// Presents the fetchRecipe HTML scripts to the front-end
app.get('/scripts/fetchRecipeScript.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, '../scripts/fetchRecipeScript.js'));
});

// Presents the complexSearch HTML scripts to the front-end
app.get('/scripts/complexSearchScript.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, '../scripts/complexSearchScript.js'));
});

// Presents the loginScript to the front-end
app.get('/scripts/loginScript.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, '../scripts/loginScript.js'));
});

// Presents the registerScript to the front-end
app.get('/scripts/registerScript.js', (req, res) => {
    res.type('application/javascript');
    res.sendFile(path.join(__dirname, '../scripts/registerScript.js'));
});

// Serve index.html for the root URL
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Serve login.html for /login URL
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Serve register.html for /register URL
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
