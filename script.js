
const firstPageText =  document.querySelector('#upper-text')
const championButton = document.querySelector('#champion-btn')
const teamButton =  document.querySelector('#team-btn')
let pageOne = document.querySelector('.vy-1')
let pageTwo = document.querySelector('.vy-2-invisible')

const pokemonContainer = document.querySelector('pokemon-container')
const findPokemonInput = document.querySelector('.search-input-pokemon') 
const myTeam = document.querySelector('.my-team')


championButton.addEventListener('click', () => {
    pageOne.style.display = 'block'
    pageTwo.style.display = 'none'
})

teamButton.addEventListener('click', () => {
    pageOne.style.display = 'none'
    pageTwo.style.display = 'block'

})


//Hämta data med namn och bild från pokemon API
/*async function GetAPI(nameUrl) {
    const response = await fetch(nameUrl)
    const data = await response.json()
    let dataResult = data.results;
    return dataResult;
}*/

const pokemonFetch = async() => {
    const baseUrl = 'https://pokeapi.co/api/v2/pokemon?';
    const pokemonList = []
    const response = await fetch(baseUrl)
    const data = await response.json()

            const pokemon = {
                name: data.name,
                image: data.sprites['front_default'],
            }
            pokemonList.push(pokemon)

            localStorage.setItem('pokemonList', JSON.stringify(pokemonList))
        }

    










async function renderUI() {
    let pokemons = await GetAPI(nameUrl);
    let pokemonsContainerEl = document.querySelector('.pokemons-container');
   
   
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
       
        pokemonList.push(pokemonInfo)
        localStorage.setItem('pokemonList', JSON.stringify(pokemonList))
        pokemonCard.classList = 'pokemon-card'

        pokemonCard.append(pokemonImg);
        pokemonCard.append(pokemonName);
        pokemonsContainerEl.append(pokemonCard);
    });

};

renderUI();

let pokemonList = []
console.log(pokemonList)


findPokemonInput.addEventListener('input', async () => {
    const searchString = findPokemonInput.value; 
    pokemonList = JSON.parse(localStorage.getItem('pokemonList'))

    const matchingPokemon = pokemonList.filter(pokemon => pokemon.name.includes(searchString))
    

    matchingPokemon.forEach(pokemon => {
        const pokemonArt = document.createElement('article')
        pokemonArt.setAttribute('class', 'pokemoncard') 
        pokemonArt.innerHTML =
        `<img scr="${imgUrl}">
        <p>${pokemon.name}</p> 
        <button class="lägg-till-pokemon"> Lägg till Pokemon </button> `

        pokemonContainer.append(pokemonArt)
    })

})