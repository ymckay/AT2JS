// Search Cocktail Page

// 1. find API
const randomCocktailUrl = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
// 2. find the document
const randomCocktailImage = document.getElementById("randomCocktailImage");
// 3. get cocktail name
const randomCocktailName = document.getElementById("randomCocktailName");
// 4. get random button
const newRandom = document.getElementById('newRandom');

// 5. add eventListener
newRandom.addEventListener("click", function (e){
e.preventDefault();
fetchRandomCocktail();
});


async function fetchRandomCocktail() {
  try {
    // get data from the api
    const response = await fetch(randomCocktailUrl);
    const data = await response.json();
    // get the first drink from the data
    const drink = data.drinks[0];

    // show the drink image and name
    randomCocktailImage.src = drink.strDrinkThumb;
    randomCocktailImage.alt = drink.strDrink;
    randomCocktailName.textContent = drink.strDrink;

gsap.fromTo(
  ".cocktail-name",
  { y: -30 }, // ← アニメーションのスタート状態
  { y: 20, duration: 2, ease: "bounce" } // ← ゴールの状態
);
  } catch (error) {
    // show error if something goes wrong
    console.error("Error fetching random cocktail:", error);
  }
}

// run this when the page is loaded
window.onload = fetchRandomCocktail;


// gsap
// gsap.to (".cocktail-name",{
//   y:50,
//   duration:2,
//   ease:"bounce",
// });

// handle Navbar on Scroll
const navbar = document.querySelector('.navbar');
const handleScroll = ()=> {
  const atTop = window.scrollY === 0;
  navbar.classList.toggle('visible-bar', atTop);
  navbar.classList.toggle('hidden-bar', !atTop);
};
window.addEventListener('scroll', ()=> requestAnimationFrame(handleScroll));

