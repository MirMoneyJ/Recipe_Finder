// Function to fetch recipe ingredients
async function fetchRecipeInfo() {
    const recipeId = document.getElementById('recipeId').value;
    if (!recipeId) {
        alert('Please enter a recipe ID');
        return;
    }

    try {
        const response = await fetch(`/fetchRecipe/${recipeId}`); // Fetch data from server w/ recipeID
        const data = await response.json(); // Parse response as JSON
        document.getElementById('recipeInfo').innerHTML = JSON.stringify(data, null, 2); // Display fetched data
    } catch (error) {
        console.error('Error fetching recipe:', error);
    }
}
