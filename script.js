
const body = document.querySelector('body')

const firstPage = {
    firstPageText: document.querySelector('#upper-text'),
    championButton: document.querySelector('#champion-btn'),
    teamButton: document.querySelector('#team-btn')
}
const viewsOne = {
    pageOne: document.querySelector('.vy-1'),
    inputPokemon: document.querySelector('.search-pokemon'),
}
const viewsTwo = {
    pageTwo: document.querySelector('.vy-2-invisible'),
    myTeam: document.querySelector('.my-team')
}

firstPage.championButton.addEventListener('click', () => {
    viewsOne.pageOne.style.display = 'block'
    viewsTwo.pageTwo.style.display = 'none'
})

firstPage.teamButton.addEventListener('click', () => {
    viewsOne.pageOne.style.display = 'none'
    viewsTwo.pageTwo.style.display = 'block'

})

/*viewsOne.inputPokemon.addEventListener('keydown', async () => {
    console.log(event.key)

    const searchString = viewsOne.input.value
    const url .......    + searchString


})*/

//Hämta data med namn på pokemon. 
let nameUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'

async function GetAPI(nameUrl) {
    const response = await fetch(nameUrl)
    const data = await response.json()
    let dataResult = data.results;
    return dataResult;
}

async function renderUI() {
    let pokemons = await GetAPI(nameUrl);
    let pokemonsContainerEl = document.querySelector('.pokemons-container');
   
    pokemons.forEach(async pokemon => {
        let response = await fetch(pokemon.url);
        let data = await response.json();
        let imgUrl = data.sprites.front_default;

        pokemon.url = imgUrl;
        let pokemonCard = document.createElement('article');
        pokemonCard.innerHTML = `
			<p>${pokemon.name}</p>
			<img src="${pokemon.url}">
		`;
        pokemonsContainerEl.appendChild(pokemonCard);
    });
};

renderUI();



// GetAPI(nameUrl)
// .then(pokemons => {
// 	pokemonNames.push(...pokemons)
// }) 
// .catch(error => {
//     console.error(error)
// })

// let pokemonNames = []