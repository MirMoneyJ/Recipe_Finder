const express = require('express');
const axios = require('axios');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.get('/:id', async (req, res) => {
    const recipeId = req.params.id;
    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=true`);
        const filePath = path.join(__dirname, '../JSON/fetchRecipe.json');
        fs.writeFileSync(filePath, JSON.stringify(response.data, null, 2), 'utf-8');
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching recipe information');
    }
});

module.exports = router;