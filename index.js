document.addEventListener('DOMContentLoaded', init)


////// BRIAN
function init() {

    const drinkForm = document.querySelector("#search-drinks")

    //fetch spirits and iterate into renderSpirits  
    fetch('http://localhost:3000/liquors')
        .then(resp => resp.json())
        .then(data => data.forEach(renderSpirits))


    // add a 'submit' Event Listener to form#search-drinks and call searchDrink funciton with it's value
    drinkForm.addEventListener('submit', (e) => {
        e.preventDefault()

        searchDrink(drinkForm.drink.value)
        drinkForm.reset();

    })

}//end init



// take value submited in form#search-drinks > create the url for the search  > fetch that search > call renderDrinkList on resp Objects
function searchDrink(formValue) {
    formValue = formValue.trim()
    formValue = formValue.split(' ').join('_')

    // due to issues with the API when an empty submit is entered. 
    // checks if formValue is empty and if so changes value to null
    if (formValue === '') {
        formValue = null
    }

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${formValue}`)
        .then(resp => resp.json())
        .then(data => {
            if (data.drinks === null) {
                // clearing the drink list so the old results don't remain if a new search returns no results
                const ul = document.querySelector('#list')
                ul.innerHTML = ''
                ////   detailsInfo.innerHTML = ''
                drinkName.innerHTML = ''
                imageDiv.innerHTML = ''
                recipeDiv.innerHTML = ''
                cardDiv.style.display = 'none'
                listDiv.style.display = 'none'

                window.alert("Sorry, we didn't find any results matching this search.")
            } else {
                renderDrinksList(data)
            }
        })

} //end searchDrink
const drinkName = document.getElementById('drink-name')
const imageDiv = document.getElementById('drink-image')
const recipeDiv = document.getElementById('drink-recipe')
const listDiv = document.querySelector('#cocktail-list')
const cardDiv = document.querySelector('#cocktail-card')
// const detailsInfo = document.getElementById('cocktail')


function renderSpirits(spirit) {
    const bar = document.querySelector('#alcohol-bar')
    const span = document.createElement('span')
    span.innerText = spirit.name
    span.className = 'spirit-span'

    bar.append(span)


    // add eventlistener to populate a list of drinks per spirit & pass list iteratively to renderDrinksList
    span.addEventListener('click', () => {

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${spirit.name}`)
            .then((resp) => resp.json())
            .then(renderDrinksList)
    }) //end event listener
    mouseColor(span)


} //end renderSpirits


function mouseColor(item) {
    item.addEventListener('mouseover', function handleMouseOver() {
        item.style.color = "#202C68";
        item.style.fontWeight = 'bold';
        //item.style.borderStyle = "groove";
        //item.style.borderWidth = "thick";
        
        
    });
    item.addEventListener('mouseout', function handleMouseOut() {
        item.style.color = 'black';
        item.style.fontWeight = 'normal'
       // item.style.borderStyle = "solid";
    });
}


function renderDrinksList(drinksBySpirit) {
    const ul = document.querySelector('#list')
    listDiv.style.display = "block"
    cardDiv.style.display = "none"
    ul.innerHTML = ''
    ////  detailsInfo.innerHTML = ''
    drinkName.innerHTML = ''
    imageDiv.innerHTML = ''
    recipeDiv.innerHTML = ''

    drinksBySpirit.drinks.forEach(drink => {
        const li = document.createElement('li')
        li.innerText = drink.strDrink
        ul.append(li)

        li.addEventListener('click', () => {
            drinkDetails(drink.idDrink)
        })        //end event listener
        mouseColor(li)

    })
}  // end renderDrinksList


function drinkDetails(drink) {
    // clears previous drink details
    ////  detailsInfo.innerHTML = "";
    drinkName.innerHTML = ''
    imageDiv.innerHTML = ''
    recipeDiv.innerHTML = ''
    //run a fetch based on the ID and pull picture, ingredients, steps
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink}`)
        .then(resp => resp.json())
        .then(drinkDetails => {

      

            const drinkImg = document.createElement('img')
            const drinkIngredients = document.createElement('ul')
            const drinkInstructions = document.createElement('p')
            const drinkGlass = document.createElement('p')
            const drinkGlassHeader = document.createElement('b')

            for (let i = 1; i <= 15; i++) {
                let ingredient = drinkDetails.drinks[0][`strIngredient${i}`];

                //add measurement. handle null measurements e.g. id=11634
                let qty = drinkDetails.drinks[0][`strMeasure${i}`];
                let measure = qty !== null ? qty + ' ' : ''

                if (ingredient) {
                    const li = document.createElement('li')
                    li.innerText = measure + ingredient
                    drinkIngredients.appendChild(li)
                    console.log(li)
                } else {
                    break;
                }
            }

            drinkGlassHeader.innerText = 'Serve in: '
            drinkGlass.append(drinkGlassHeader, drinkDetails.drinks[0].strGlass)
            drinkName.innerText = drinkDetails.drinks[0].strDrink
            drinkImg.src = drinkDetails.drinks[0].strDrinkThumb
            drinkInstructions.innerText = drinkDetails.drinks[0].strInstructions

            recipeDiv.append(drinkIngredients, drinkInstructions)
            imageDiv.append(drinkImg, drinkGlass)
            cardDiv.style.display = "block";
        })


} //end drinkDetails















