// Function to fetch recipies
async function performComplexSearch() {

    // Get values from input fields
    const query = document.getElementById('query').value;
    const cuisine = document.getElementById('cuisine').value;
    const intolerances = document.getElementById('intolerances').value;
    const diet = document.getElementById('diet').value;

    try {
        const response = await fetch(`/complexSearch?query=${query}&cuisine=${cuisine}&intolerances=${intolerances}&diet=${diet}`); 
        const data = await response.json(); 
        document.getElementById('searchResults').innerHTML = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error performing complex search:', error);
    }
}
