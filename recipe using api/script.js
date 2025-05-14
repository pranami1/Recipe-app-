const searchbar = document.querySelector('.searchbar')
const clickbtn = document.querySelector('.clickbtn')
const recipemodule = document.querySelector('.recipemodule')
const recipeDetails = document.querySelector('.recipe-details')
const closebtn = document.querySelector('.btn-close')


const fetchapi = async (js) => {
    recipemodule.innerHTML = "Fetching information.."
    try {
        const api = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${js}`)
        const response = await api.json()
        recipemodule.innerHTML = ""

        response.meals.forEach(meal => {
            const recipediv = document.createElement('div')
            recipediv.classList.add('recipe')
            recipediv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h2>${meal.strMeal}</h2>
        <p><span>${meal.strArea}</span> Dish</p>
        <h3>This is a <span>${meal.strCategory}</span> Dish</h3>
        `
            // more deatis buttton create over here, not in html
            const button = document.createElement('button')
            button.classList.add('btnabout')
            button.textContent = "More details"
            recipediv.appendChild(button)

            button.addEventListener('click', () => {
                popupbtn(meal);
            })
            recipemodule.appendChild(recipediv)
        });
    } catch (error) {
        recipemodule.innerHTML = `<h3>Error in fetching data..!</h3>`
    }
}


// this is for search button 
clickbtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchValue = searchbar.value.trim();
    if (!searchValue) {
        recipemodule.innerHTML = `<h3>Type recipe name..!</h3>`
        return
    }
    fetchapi(searchValue);
});

const fetchIngredients = (meal) => {

    let ingredent = ""

    for (let i = 1; i <= 20; i++) {
        const ingredentlists = meal[`strIngredient${i}`]

        if (ingredentlists) {
            const measure = meal[`strMeasure${i}`]
            ingredent += `<li>${measure} ${ingredentlists}</li>`
        }
        else {
            break;
        }
       
    }
     return ingredent;

}

// this is for more details button
const popupbtn = (meal) => {
    recipeDetails.innerHTML = `
    <h2 class="meal">${meal.strMeal}</h2>
    <h3 class="ingredent">Ingredent:-</h3>
    <ul>${fetchIngredients(meal)}</ul>
    <h3 class="instructions">Instructions:-</h3>
    <p>${meal.strInstructions}</p>
    `
    recipeDetails.parentElement.style.display = "block"


}

// close button event to close popup msj
closebtn.addEventListener('click', () => {
    recipeDetails.parentElement.style.display = "none"
})