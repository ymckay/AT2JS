// search.js
// This script handles the Cocktail Search page.
// It fetches cocktail data from TheCocktailDB API based on the user's search keyword,
// displays matching results as Bootstrap cards, and adds scroll b=behaviour to the navbar.

// cocktailSearch Class
// @class
class CocktailSearch {
  // @constructor
  // @param {string} name - Name of the cocktail
  // @param {string} image - Image URL of the cocktail
  // @param {Array<string>} ingredients - List of ingredients
  // @param {string} link - External link to full recipe

  constructor(name, image, ingredients, link) {
    this.name = name;
    this.image = image;
    this.ingredients = ingredients;
    this.link = link;
  }
}

// API and DOM setup

// find API
const searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

// add eventListener to search form
document.getElementById("searchForm").addEventListener("submit", function (e) {
  // prevent form from submitting normally
  e.preventDefault(); 
  const query = document.getElementById("searchInput").value.trim();
  if (query !== "") {
    // fetch matching cocktail data
    fetchSearchCocktail();
  }
});

// fetch cocktail data from API
// fetch cocktail data from theCocktailDB based on user input.
// if found, convert to CocktailSearch objects and display them.
async function fetchSearchCocktail() {
  const keyword = document.getElementById("searchInput").value.trim();
  // check if user entered a keyword
  if (!keyword) {
    alert("Please enter a cocktail name.");
    return;
  }

  try {
    // fetch data from the API
    const response = await fetch(searchUrl + keyword);
    const data = await response.json();
    // check if cocktail exists
    if (!data.drinks) {
      alert("No cocktail found");
      return;
    }
    // get ingredients of up to 20 cocktails and their ingredients
    const cocktails = data.drinks.slice(0, 20).map((drink) => {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = drink[`strIngredient${i}`];
        if (ingredient) {
          ingredients.push(ingredient);
        }
      }
      // return cocktail object
      return new CocktailSearch(
        drink.strDrink, 
        drink.strDrinkThumb, 
        ingredients,
        `https://www.thecocktaildb.com/drink.php?c=${drink.idDrink}`,
      );
    });
    // display all cocktail cards
    displayCocktailList(cocktails);
  } catch (error) {
    // handle error
    console.error("Error fetching cocktail:", error);
  }
}

// Display Cocktail Cards
// display list of cocktails as bootstrap cards.
// @param {CocktailSearch[]} cocktails - Array of cocktail objects
function displayCocktailList(cocktails) {
  const container = document.getElementById("searchResults");
  container.innerHTML = ""; // clear previous results

  cocktails.forEach((cocktail) => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-6 d-flex";
    card.innerHTML = `
  <div class="card mb-4 w-100 shadow-sm">
    <div class="row g-0 h-100">
      <div class="col-4">
        <img src="${cocktail.image}" class="img-fluid rounded-start h-100 object-fit-cover" alt="${cocktail.name}">
      </div>
      <div class="col-8 d-flex">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title">${cocktail.name}</h5>
            <p class="card-text mb-2">
              <strong>Ingredients:</strong><br>
              ${cocktail.ingredients.join(", ")}
            </p>
          </div>
          <a href="${cocktail.link}" target="_blank" class="btn btn-outline-dark mt-2">View Recipe</a>
        </div>
      </div>
    </div>
  </div>
    `;
    container.appendChild(card);
  });
}

// Navbar Scroll Behaviour
// handle Navbar visibility based on Scroll position
const navbar = document.querySelector('.navbar');
const handleScroll = ()=> {
  const atTop = window.scrollY === 0;
  navbar.classList.toggle('visible-bar', atTop);
  navbar.classList.toggle('hidden-bar', !atTop);
};
window.addEventListener('scroll', ()=> requestAnimationFrame(handleScroll));