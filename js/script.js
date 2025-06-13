// File: script.js
// Author: ymckay
// Date: 2025-06-04
// Version: 1.0
// Purpose: This script handles the functionality of the "Random Cocktail" page. It fetches a random cocktail from TheCocktailDB API, displays it with animation, and manages the navbar behavior on scroll.
// Known bugs: None
// License: For educational use only



//Random Cocktail Feature

// API to fetch a random cocktail
const randomCocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
// find the document
const randomCocktailImage = document.getElementById("randomCocktailImage");
const randomCocktailName = document.getElementById("randomCocktailName");
const newRandom = document.getElementById('newRandom');

// when button is clicked, fetch a new cocktail
newRandom.addEventListener("click", function (e){
e.preventDefault();
fetchRandomCocktail();
});

// fetch a random cocktail from the API and update the DOM with image and name.
// also animate the drink name using GSAP.
async function fetchRandomCocktail() {
  try {
    // get data from the api
    const response = await fetch(randomCocktailUrl);
    // convert to json
    const data = await response.json();
    // get the drink object
    const drink = data.drinks[0];

    // update drink image and name
    randomCocktailImage.src = drink.strDrinkThumb;
    randomCocktailImage.alt = drink.strDrink;
    randomCocktailName.textContent = drink.strDrink;

    // animate the drink name
    gsap.fromTo(
      ".cocktail-name",
      { y: -30 },
      { y: 20, duration: 2, ease: "bounce" } 
    );
      } catch (error) {
        // show error if something goes wrong
        console.error("Error fetching random cocktail:", error);
      }
    }
    // automatically load a cocktail on page load
    window.onload = fetchRandomCocktail;


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


// Get all buttons for toggling dark mode (both mobile and desktop)
const toggles = document.querySelectorAll("#toggleDarkMode, #toggleDarkModeDesktop");

// Get body element
const body = document.body;

// Get all cocktail logo icons (both mobile and desktop)
const cocktailIcons = document.querySelectorAll(".cocktail-icon");

// Function to update cocktail icon based on theme
function updateCocktailIcons() {
  const isDark = body.classList.contains("dark-mode");
  cocktailIcons.forEach(icon => {
    icon.src = isDark ? "./img/local_bar_white.svg" : "./img/local_bar.svg";
  });
}

// Keep the saved theme even after reloading
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggles.forEach(btn => btn.textContent = "☀️");
  updateCocktailIcons();
}

// Toggle dark mode on all matching buttons
toggles.forEach(toggle => {
  toggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode");

    const isDark = body.classList.contains("dark-mode");
    toggles.forEach(btn => btn.textContent = isDark ? "☀️" : "🌙");
    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateCocktailIcons();
  });
});