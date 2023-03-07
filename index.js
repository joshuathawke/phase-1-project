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
        if(data.drinks === null){
            const drinkObj = {
                strDrink: "We're Sorry, We Were Not Able To Find A Match",
                idDrink: null
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
    span.addEventListener('click', () => {

        fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${spirit.name}`)
            .then((resp) => resp.json())
            .then(data => data.drinks.forEach(renderDrinksList))


        // take spirit create the url for fetching the list of drink with that spirit   
        //mouseover event over each spirit to change color / bold /whatever    

        // pass fetch results (set of objects) pass it thorough renderDrinksList
    })

    bar.append(span)

} //end renderSpirits

function renderDrinksList(drinksBySpirit) {

    //iterate and inserts list into list to be rendered in the div

    // to each list item add event listener to pass it to drinkDetails

}  // end renderDrinksList


////JOSHUA
function drinkDetails(drink) {

    //run a fetch based on the ID and pull picture, ingredients, steps
    fetch(`www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${'idDrink'}`)
        .then(resp => resp.json())
        .then(drinkDetails => {
            const detailsInfo = document.getElementById('details-info')
            detailsInfo.innerText = `
        <h2>${drink.name}</h2>
        <h2>${drink.ingredients}</h2>
        <h2>${drink.instructions}</h2>
        <h2>${drink.glass}</h2>`
        })
    render.drinkDetails()
    //render in the div



} //end drinkDetails















