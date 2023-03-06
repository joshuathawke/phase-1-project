document.addEventListener('DOMContentLoaded', init)

function init () {
const spirits = ['vodka', 'rum', 'tequila']

spirits.forEach(renderSpirits)
}//end init
  

function renderSpirits (spirit){
 const bar = document.querySelector('#alcohol-bar')
    const span = document.createElement('span')
    span.innerText = spirit
    span.addEventListener('click', () => { 
     console.log(span.innerText)})

bar.append(span)


    }
   
    
    
  







 




