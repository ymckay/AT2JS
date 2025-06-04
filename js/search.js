class CocktailSearch {
  constructor(name, image, ingredients, link) {
    this.name = name;
    this.image = image;
    this.ingredients = ingredients;
    this.link = link;
  }
}

// 1. find API
const searchUrl = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
// 2. find the document
// const searchImage = document.getElementById("searchImage");
// const searchName = document.getElementById("searchName");
// const newSearch = document.getElementById("newSearch");

// 3. add eventListener to search form
document.getElementById("searchForm").addEventListener("submit", function (e) {
  e.preventDefault(); // フォームのデフォルト動作を止める
  const query = document.getElementById("searchInput").value.trim();
  if (query !== "") {
    // document.getElementById("hero").style.display = "none"; // heroイメージを非表示
    fetchSearchCocktail(); // API呼び出し関数に変更！
  }
});

// 4. fetch cocktail data from API
async function fetchSearchCocktail() {
  const keyword = document.getElementById("searchInput").value.trim();
  // 5. check if user entered a keyword
  if (!keyword) {
    alert("Please enter a cocktail name.");
    return;
  }

  try {
    // 6. fetch data from the API
    const response = await fetch(searchUrl + keyword);
    const data = await response.json();
    // 7. check if cocktail exists
    if (!data.drinks) {
      alert("No cocktail found");
      return;
    }
    // 8. get ingredients of up to 15 cocktails
    const cocktails = data.drinks.slice(0, 20).map((drink) => {
      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredient = drink[`strIngredient${i}`];
        if (ingredient) {
          ingredients.push(ingredient);
        }
      }
      // 9. return cocktail object
      return new CocktailSearch(
        drink.strDrink, 
        drink.strDrinkThumb, 
        ingredients,
        `https://www.thecocktaildb.com/drink.php?c=${drink.idDrink}`,
      );
      //   name: drink.strDrink,
      //   image: drink.strDrinkThumb,
      //   ingredients: ingredients,
      //   link: `https://www.thecocktaildb.com/drink.php?c=${drink.idDrink}`,
      // };
    });
    // 10. display all cocktail cards
    displayCocktailList(cocktails);
  } catch (error) {
    // 11. handle error
    console.error("Error fetching cocktail:", error);
  }
}

// 12. display one selected cocktail(no used here)
// function displayCocktail(cocktail) {
//   const searchImage = document.getElementById("searchImage");
//   const searchName = document.getElementById("searchName");
//   const searchIngredients = document.getElementById("searchIngredients");

//   searchImage.src = cocktail.image;
//   searchImage.alt = cocktail.name;
//   searchName.textContent = cocktail.name;
//   searchIngredients.innerHTML = `<strong>Ingredients:</strong><br>${cocktail.ingredients.join(", ")}`;
// }

// display list of cocktails as bootstrap cards
function displayCocktailList(cocktails) {
  const container = document.getElementById("searchResults");
  container.innerHTML = ""; // 前の結果をクリア

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


// handle Navbar on Scroll
const navbar = document.querySelector('.navbar');
const handleScroll = ()=> {
  const atTop = window.scrollY === 0;
  navbar.classList.toggle('visible-bar', atTop);
  navbar.classList.toggle('hidden-bar', !atTop);
};
window.addEventListener('scroll', ()=> requestAnimationFrame(handleScroll));