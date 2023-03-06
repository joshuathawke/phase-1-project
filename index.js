document.addEventListener('DOMContentLoaded', init)


////// BRIAN
function init() {



    //fetch spirits and iterate into renderSpirits
    spirits.liquors.forEach(renderSpirits)


    function searchDrink() {

        // setup a form to take the search > create the url for the search  > fetch that search

        // to each list item add event listener to pass it to renderDrinksList

    } //end searchDrink


}//end init

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


    //mouseover event over each spirit to change color / bold /whatever    

} //end renderSpirits

function renderDrinksList(drinksBySpirit) {
    const ul = document.querySelector('#list')
    ul.innerHTML = ''

    drinksBySpirit.drinks.forEach(drink => {
        const li = document.createElement('li')
        li.innerText = drink.strDrink
        ul.append(li)

        li.addEventListener('click', () => {
            fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drink.idDrink}`)
                .then((resp) => resp.json())
                .then(drinkDetails)
        })

    })
}  // end renderDrinksList


////JOSHUA
function drinkDetails(drink) {

    //run a fetch based on the ID and pull picture, ingredients, steps

    //render in the div



} //end drinkDetails















