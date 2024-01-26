const express = require('express');
const axios = require('axios');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Route for handling searches
router.get('/', async (req, res) => {
    const { query, cuisine, intolerances, diet } = req.query;
    try {
        // Request to Spoonacular API
        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
            params: {
                apiKey: process.env.SPOONACULAR_API_KEY,
                query,
                cuisine,
                intolerances,
                diet,
            },
        });

        // Save to JSON file
        const filePath = path.join(__dirname, '../JSON/complexSearch.json');
        fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2), 'utf-8');

        res.json(response.data); // Send response data
    } catch (error) {
        console.error(error);
        res.status(500).send('Error performing complex search'); // Sends a 500 error
    }
});

module.exports = router;
