document.addEventListener('DOMContentLoaded', init)


////// BRIAN
function init() {
    // const spirits = ['vodka', 'rum', 'tequila']

  
    //fetch spirits and iterate into renderSpirits
    spirits.forEach(renderSpirits)


    function searchDrink() {

        // setup a form to take the search > create the url for the search  > fetch that search

        // to each list item add event listener to pass it to renderDrinksList

    } //end searchDrink


}//end init

//// DIANA  & css grid
function renderSpirits(spirit) {
    const bar = document.querySelector('#alcohol-bar')
    const span = document.createElement('span')
    span.innerText = spirit
    span.addEventListener('click', () => {

fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${spirit.name}`)
.then((resp)=> resp.json())
.then(data=> data.forEach(renderDrinksList))


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















