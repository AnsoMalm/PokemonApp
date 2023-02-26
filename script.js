
const firstPageText =  document.querySelector('#upper-text')
const championButton = document.querySelector('#champion-btn')
const teamButton =  document.querySelector('#team-btn')
let pageOne = document.querySelector('.vy-1')
let pageTwo = document.querySelector('.vy-2-invisible')

const pokemonContainer = document.querySelector('.pokemon-container')
const findPokemonInput = document.querySelector('.search-pokemon') 
const myTeam = document.querySelector('.my-team')


championButton.addEventListener('click', () => {
    pageOne.style.display = 'block'
    pageTwo.style.display = 'none'
})

teamButton.addEventListener('click', () => {
    pageOne.style.display = 'none'
    pageTwo.style.display = 'block'

})

const nameUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'

//Hämta data med namn och bild från pokemon API
async function GetAPI(nameUrl) {
    const response = await fetch(nameUrl)
    const data = await response.json()
    let dataResult = data.results;
    return dataResult;
}

async function renderUI() {
    let pokemons = await GetAPI(nameUrl);
   
    pokemons.forEach(async pokemon => {
        let response = await fetch(pokemon.url);
        let data = await response.json();
        let imgUrl = data.sprites.front_default;

        let pokemonInfo = {
            name: pokemon.name,
            image: imgUrl

        }
        let pokemonCard = document.createElement('article')
        let pokemonImg = document.createElement('div')
        pokemonImg.innerHTML = `<img src="${imgUrl}">`
        let pokemonName = document.createElement('p')
        pokemonName.innerHTML = `${pokemon.name}`
        pokemonCard.append(pokemonImg);
        pokemonCard.append(pokemonName);
        pokemonContainer.append(pokemonCard);
        pokemonCard.classList = 'pokemon-card'

        pokemonList.push(pokemonInfo)

        //Spara datan till local storage 
        localStorage.setItem('pokemonList', JSON.stringify(pokemonList))
      
    });

};

renderUI();

let pokemonList = []
console.log(pokemonList)


findPokemonInput.addEventListener('input', async() => {
    const searchString = findPokemonInput.value; 
    pokemonList = JSON.parse(localStorage.getItem('pokemonList'))

    const matchingPokemon = pokemonList.filter(pokemon => pokemon.name.includes(searchString))

    pokemonContainer.innerHTML = "",
    
    matchingPokemon.forEach(pokemon => {
        const pokemonDiv = document.createElement('div')
        pokemonDiv.setAttribute('class', 'pokemoncard') 
        pokemonDiv.innerHTML =
        `<img scr="${pokemon.image}">
        <p>${pokemon.name}</p> 
        <button class="lägg-till-pokemon"> Lägg till Pokemon </button> `

        pokemonContainer.append(pokemonDiv)
    })

})
