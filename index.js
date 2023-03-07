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
    })

}//end init


// take value submited in form#search-drinks > create the url for the search  > fetch that search > call renderDrinkList on resp Objects
function searchDrink(formValue) {
    formValue = formValue.trim()
    formValue = formValue.split(' ').join('_')

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${formValue}`)
        .then(resp => resp.json())
        .then(data => {
            if (data.drinks === null) {
                const drinkObj = {
                    drinks: [
                        {
                            strDrink: "We're Sorry, We Were Not Able To Find A Match",
                            idDrink: null
                        }]
                };
                console.log(drinkObj)
                renderDrinksList(drinkObj)
            } else {
                console.log(data.drinks)

                renderDrinksList(data)
            }
        })

} //end searchDrink


//// DIANA  & css grid
function renderSpirits(spirit) {
    const bar = document.querySelector('#alcohol-bar')
    const span = document.createElement('span')
    span.innerText = spirit.name

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
        item.style.color = 'red';
    });
    item.addEventListener('mouseout', function handleMouseOut() {
        item.style.color = 'black';
    });
}
function renderDrinksList(drinksBySpirit) {
    const ul = document.querySelector('#list')
    ul.innerHTML = ''

    drinksBySpirit.drinks.forEach(drink => {
        const li = document.createElement('li')
        li.innerText = drink.strDrink
        ul.append(li)

        li.addEventListener('click', (e) => {
            drinkDetails(drink.idDrink)

        }) 
        //end event listener

        mouseColor(li)

    })
}  // end renderDrinksList


////JOSHUA
function drinkDetails(drink) {
    
    //run a fetch based on the ID and pull picture, ingredients, steps
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink}`)
        .then(resp => resp.json())
        .then(drinkDetails => {
            const detailsInfo = document.getElementById('cocktail-details')
            const drinkImg = document.createElement('img')
            const drinkName = document.createElement('h2')
            const drinkIngredients = document.createElement('ul')
            const drinkInstructions = document.createElement('p')
            const drinkGlass = document.createElement('p')
            drinkGlass.innerText = drinkDetails.drinks[0].strGlass
            drinkName.innerText = drinkDetails.drinks[0].strDrink
            drinkImg.src = drinkDetails.drinks[0].strDrinkThumb
            console.log(drinkDetails)
            drinkIngredients.innerText = drinkDetails.drinks[0].strIngredient1
            drinkInstructions.innerText = drinkDetails.drinks[0].strInstructions
            
            detailsInfo.append(drinkName, drinkImg, drinkIngredients, drinkInstructions,drinkGlass)


        //     detailsInfo.innerHTML = `
        // <h2>${drinkDetails.drinks[0].strDrink}</h2>
        // <h2>${drinkDetails.drinks[0].strIngredient1}</h2>
        // <h2>${drinkDetails.drinks[0].strInstructions}</h2>
        // <h2>${drinkDetails.drinks[0].strGlass}</h2>`

        })
    // render.drinkDetails()
    //render in the div



} //end drinkDetails















