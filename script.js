//Hämta element från DOM
const firstPageText =  document.querySelector('#upper-text')
const championButton = document.querySelector('#champion-btn')
const teamButton =  document.querySelector('#team-btn')
let pageOne = document.querySelector('.vy-1')
let pageTwo = document.querySelector('.vy-2-invisible')
const pokemonContainer = document.querySelector('.pokemon-container')
const findPokemonInput = document.querySelector('.search-pokemon') 

//funktion för att byta till champion-vyn
championButton.addEventListener('click', () => {
    pageOne.style.display = 'block'
    pageTwo.style.display = 'none'
})
//funktion för att byta till my-team-vyn 
teamButton.addEventListener('click', () => {
    pageOne.style.display = 'none'
    pageTwo.style.display = 'block'
})

//Url till API:et som ska användas 
const nameUrl = 'https://pokeapi.co/api/v2/pokemon?limit=10&offset=0'


//array för att lägra pokemons-inforamtionen
let pokemonList = [];

//Hämta data från pokemon API
async function GetAPI(nameUrl) {
    const response = await fetch(nameUrl)
    const data = await response.json()
    let dataResult = data.results;
    return dataResult;
}

//funktionen för att rendera pokemon på sidan
async function renderUI() {
    let pokemons = await GetAPI(nameUrl);

    //loopa genom varje pokemon och hämta data från dess url 
    pokemons.forEach(async pokemon => {
        let response = await fetch(pokemon.url);
        let data = await response.json();

        //Lagra namn och bild för varje pokemon i pokemonList-arrayen 
        const pokemonInfo = {
            name: data.name,
            image: data.sprites.front_default

        }
        pokemonList.push(pokemonInfo)

    });
    console.log(pokemonList)
};
//kalla på funktionen för att rendera pokemon på sidan 

renderUI();

//funktionen som körs när använder skriver i sökfältet
findPokemonInput.addEventListener('keyup', async() => {
    const searchString = findPokemonInput.value; 
    const matchingPokemon = pokemonList.filter(pokemon => pokemon.name.includes(searchString))

    //rensar container innan ny pokemon läggs till. 
    pokemonContainer.innerHTML = "",

    //loopa genom varje matchande pokemon och skapa ett kort för varje 
    matchingPokemon.forEach(pokemon => {
        let pokemonCard = document.createElement('article');
        pokemonCard.setAttribute = ('class'
        ,'pokemon-card');
        let pokemonName = document.createElement('p');
        pokemonName.setAttribute('class', 'pokemon-name')
        pokemonName.innerHTML = `${pokemon.name}`;
        let pokemonImg = document.createElement('div');
        pokemonImg.innerHTML = `<img src="${pokemon.image}">`;
        let pokemonButton = document.createElement('button');
        pokemonButton.setAttribute('class', 'pokemon-button');
        pokemonButton.innerText = 'Lägg till pokemon';

        
        pokemonCard.append(pokemonName);
        pokemonCard.append(pokemonImg);
        pokemonCard.append(pokemonButton);
        pokemonContainer.append(pokemonCard);

        //lägg till eventlistner för att lägga till pokemon i MypokemonTeam 
        pokemonButton.addEventListener('click', () => {
            addToMyTeam(pokemon);
        })

    });
})



let myPokemonTeam = [];


function renderMyTeam() {
    const myPokemonContainer = document.querySelector('.my-team-pokemon-container')
    myPokemonContainer.innerHTML = '';

    myPokemonTeam.forEach(pokemon => {
        let pokemonCard = document.createElement('article')
        pokemonCard.setAttribute('class', 'my-pokemon-card');
        let pokemonName = document.createElement('p');
        pokemonName.innerHTML = `${pokemon.name}`;
        let pokemonImg = document.createElement('div');
        pokemonImg.innerHTML = `<img src="${pokemon.image}">`;
        let nameInput = document.createElement('input')
        nameInput.placeholder = 'Skriv in namn på pokemon';
        let removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'remove-button')
        removeButton.innerText = 'Kicka från laget';

      
        pokemonCard.append(pokemonName);
        pokemonCard.append(pokemonImg);
        pokemonCard.append(removeButton);
        myPokemonContainer.append(pokemonCard);
    }); 
}

function addToMyTeam(pokemon) {
    myPokemonTeam.push(pokemon); 
    renderMyTeam();
}



