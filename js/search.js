// File: search.js
// Author: ymckay
// Date: 2025-06-04
// Version: 1.0
// Purpose: This script handles the Cocktail Search page. It fetches cocktail data from TheCocktailDB API based on the user's search keyword, displays matching results as Bootstrap cards, and manages navbar visibility on scroll.
// Known bugs: None
// License: For educational use only



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
  const input = document.getElementById('searchInput');
    input.placeholder = "Search Cocktails...";
    input.classList.remove('error-placeholder');
  const query = input.value.trim();
  if (query === "") {
    input.value = "";
    input.placeholder = "Please enter a cocktail name.";
    input.classList.add("error-placeholder"); 
    return;
  }
  input.value = "";
  // fetch matching cocktail data
  fetchSearchCocktail(query); 
  });

// fetch cocktail data from API
// fetch cocktail data from theCocktailDB based on user input.
// if found, convert to CocktailSearch objects and display them.
async function fetchSearchCocktail(keyword) {
  if (!keyword) {
    alert("Please enter a cocktail name.");
    return;
  }

  try {
    const response = await fetch(searchUrl + keyword);
    const data = await response.json();

    const input = document.getElementById('searchInput');
    const container = document.getElementById("searchResults");
    const placeholder = document.getElementById("placeholderContainer");

    // clear previous results
    container.innerHTML = "";

    if (!data.drinks) {
      // No results
      input.value = "";
      input.placeholder = "No cocktail found.";
      input.classList.add("error-placeholder");

      // show instruction again
      // const container = document.getElementById("searchResults");
      // hide initial placeholder
      const placeholder = document.getElementById("placeholderContainer");
  if (placeholder) {
    placeholder.style.display = "none";
  }
  container.innerHTML = `
  <div id="placeholderContainer" class="row justify-content-center my-5">
    <div class="col-md-8 text-center">
      <div class="search-card p-4">
        <img src="./img/emoji-frown.svg" class="frown mb-3" alt="Cocktail Icon" width="40" height="40">
        <h2 class="fs-4 text-accent fw-semibold">No Cocktail Found</h2>
        <p class="text-muted mb-0">Type a name above and find your favorite cocktail 🍸</p>
      </div>
    </div>
  </div>
  `;
  // gsap animation for the Icon
    gsap.from(".frown", { rotation: 180, duration: 3, scale:2 });
      return;
    }

    // Results found
    input.value = "";
    placeholder.style.display = "none"; // hide the instruction

    const cocktails = data.drinks.slice(0, 20).map((drink) => {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = drink[`strIngredient${i}`];
        if (ingredient) {
          ingredients.push(ingredient);
        }
      }
      return new CocktailSearch(
        drink.strDrink,
        drink.strDrinkThumb,
        ingredients,
        `https://www.thecocktaildb.com/drink.php?c=${drink.idDrink}`
      );
    });

    displayCocktailList(cocktails);

  } catch (error) {
    console.error("Error fetching cocktail:", error);
  }
}

// Display Cocktail Cards
// display list of cocktails as bootstrap cards.
// @param {CocktailSearch[]} cocktails - Array of cocktail objects
function displayCocktailList(cocktails) {
  // hide the initial placeholder message
  const placeholderContainer = document.getElementById("placeholderContainer");
  if (placeholderContainer) {
  placeholderContainer.style.display = "none";
  }
  const container = document.getElementById("searchResults");
  container.innerHTML = ""; // clear previous results

  cocktails.forEach((cocktail) => {
    const card = document.createElement("div");
    card.className = "col-12 col-lg-6 d-flex";
    card.innerHTML = `
  <div class="card w-100 shadow-sm">
    <div class="row g-0 h-100">
      <div class="col-5">
        <img src="${cocktail.image}" class="img-fluid rounded-start object-fit-cover" alt="${cocktail.name}">
      </div>
      <div class="col-7 d-flex">
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

// handle Navbar on Scroll
// This section updates the navbar style based on scroll position.
// When the user scrolls down, the navbar gets a different class.

const navbar = document.querySelector('.navbar');
// Toggle navbar classes based on scroll position
const handleScroll = ()=> {
  const atTop = window.scrollY === 0;
  // add "visible-bar" at the top, "hidden-bar" when scrolling
  navbar.classList.toggle('visible-bar', atTop);
  navbar.classList.toggle('hidden-bar', !atTop);
};
// Listen for scroll and apply changes using requestAnimationFrame
window.addEventListener('scroll', ()=> requestAnimationFrame(handleScroll));