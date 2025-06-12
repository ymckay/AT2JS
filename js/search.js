// File: search.js
// Author: ymckay
// Date: 2025-06-04
// Version: 1.1
// Purpose: Cocktail search page logic with TheCocktailDB API, card display, and suggested keyword buttons.
// License: For educational use only

// CocktailSearch Class
class CocktailSearch {
  constructor(name, image, ingredients, link) {
    this.name = name;
    this.image = image;
    this.ingredients = ingredients;
    this.link = link;
  }
}

// API URL
const searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

// Search Form Submission
document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const input = document.getElementById("searchInput");
  input.placeholder = "Search Cocktails...";
  input.classList.remove("error-placeholder");
  const query = input.value.trim();
  if (query === "") {
    input.value = "";
    input.placeholder = "Please enter a cocktail name.";
    input.classList.add("error-placeholder");
    return;
  }
  fetchSearchCocktail(query);
});

// Suggested Search Buttons
document.querySelectorAll(".search-suggestion").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById("searchInput");
    input.value = button.textContent;
    document.getElementById("searchForm").dispatchEvent(new Event("submit"));
  });
});

// Fetch Cocktail Data
async function fetchSearchCocktail(keyword) {
  if (!keyword) return;

  try {
    const response = await fetch(searchUrl + keyword);
    const data = await response.json();

    const input = document.getElementById("searchInput");
    const container = document.getElementById("searchResults");

    container.innerHTML = "";

    // No Results Found
    if (!data.drinks) {
      input.value = "";
      input.placeholder = "No cocktail found.";
      input.classList.add("error-placeholder");

  container.innerHTML = `
  <div class="row justify-content-center my-5">
    <div class="col-md-8">
      <div class="search-card p-4 text-center">
        <img src="./img/emoji-frown.svg" class="frown mb-3 d-block mx-auto" alt="No cocktail" width="40" height="40">
        <h2 class="fs-4 text-accent fw-semibold">No Cocktail Found</h2>
        <p class="text-muted mb-0">Try a different keyword 🍸</p>
      </div>
    </div>
  </div>
`;

      gsap.from(".frown", { rotation: 180, duration: 3, scale: 2 });
      return;
    }

    // Display Results
    input.value = "";
    const cocktails = data.drinks.slice(0, 20).map((drink) => {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ing = drink[`strIngredient${i}`];
        if (ing) ingredients.push(ing);
      }
      return new CocktailSearch(
        drink.strDrink,
        drink.strDrinkThumb,
        ingredients,
        `https://www.thecocktaildb.com/drink.php?c=${drink.idDrink}`
      );
    });

    displayCocktailList(cocktails);
  } catch (err) {
    console.error("Error fetching cocktail:", err);
  }
}

// Display Cocktail Cards
function displayCocktailList(cocktails) {
  const container = document.getElementById("searchResults");
  container.innerHTML = "";

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
              <a href="${cocktail.link}" target="_blank" class="btn btn-outline-dark rounded-pill mt-2">View Recipe</a>
            </div>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Navbar Scroll Animation
const navbar = document.querySelector(".navbar");
const handleScroll = () => {
  const atTop = window.scrollY === 0;
  navbar.classList.toggle("visible-bar", atTop);
  navbar.classList.toggle("hidden-bar", !atTop);
};
window.addEventListener("scroll", () => requestAnimationFrame(handleScroll));