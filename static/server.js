const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fetchRecipeRoute = require('../routes/fetchRecipe');
const complexSearchRoute = require('../routes/complexSearch');
require('dotenv').config({ path: path.join(__dirname, '../key.env') }); // Load the value from key.env

const app = express();
const PORT = process.env.PORT || 5000;
const DB_PATH = process.env.DB_PATH || 'mongodb://127.0.0.1:27017/SpoonacularAPI_DB';
//-----------------------------------------------------------------------------------------------------\\

app.set('view engine', 'ejs');
mongoose.connect(DB_PATH);
app.use(express.static(path.join(__dirname, '../public'))); // Uses static file from public directory
app.use(express.static(path.join(__dirname, '../scripts')));

// Points to the routing scripts
app.use('/fetchRecipe', fetchRecipeRoute);
app.use('/complexSearch', complexSearchRoute);

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

app.get('/', (req, res) => {
    // Render the main HTML file for the React app
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
//-----------------------------------------------------------------------------------------------------\\

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
