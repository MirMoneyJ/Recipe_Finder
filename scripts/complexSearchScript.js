function performComplexSearch() {
    const query = document.getElementById('query').value;
    const cuisine = document.getElementById('cuisine').value;
    const intolerances = document.getElementById('intolerances').value;
    const diet = document.getElementById('diet').value;
  
    // Clear previous search results
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = '';
  
    // Make a GET request to the server and performs the search
    fetch(`/complexSearch?query=${query}&cuisine=${cuisine}&intolerances=${intolerances}&diet=${diet}`)
      .then((response) => response.json())
      .then((data) => {
        const results = data.results;
  
        if (results.length === 0) {
          searchResultsDiv.innerHTML = 'No results found.';
          return;
        }
  
        // Loop through the results and create a card for each recipe
        results.forEach((recipe) => {
          const card = document.createElement('div');
          card.classList.add('recipe-card'); 
  
          const title = document.createElement('h3');
          title.textContent = recipe.title;
  
          const image = document.createElement('img');
          image.src = recipe.image;
          image.alt = recipe.title;
  
          card.appendChild(title);
          card.appendChild(image);
          searchResultsDiv.appendChild(card);
        });
      })
      .catch((error) => {
        console.error('Error performing complex search:', error);
        searchResultsDiv.innerHTML = 'Error performing search.';
      });
  }
  