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
        
        let pokemonName = document.createElement('p');
        pokemonName.innerHTML = `${pokemon.name}`;

        let pokemonImg = document.createElement('div');
        pokemonImg.innerHTML = `<img src="${pokemon.image}">`;
        
        let pokemonButton = document.createElement('button');
        pokemonButton.innerText = 'Lägg till pokemon';

        pokemonCard.classList ='pokemon-card';
        pokemonName.classList = 'pokemon-name';
        pokemonImg.classList = 'pokemon-img';
        pokemonButton.classList ='pokemon-button';
        
        pokemonCard.append(pokemonName, pokemonImg, pokemonButton);
        pokemonContainer.append(pokemonCard);

        //lägg till eventlistner för att lägga till pokemon i MypokemonTeam 
        pokemonButton.addEventListener('click', () => {
            if (myPokemonTeam.length < 3) {
                myPokemonTeam.push(pokemon); 
            } else {
                reserveList.push(pokemon)
            }
            renderMyTeam();
            renderReserveList();
        })

    });
})



let myPokemonTeam = [];
let reserveList = []; 


function renderMyTeam() {
    const myPokemonContainer = document.querySelector('.my-team-pokemon-container')
    myPokemonContainer.innerHTML = '';

    myPokemonTeam.forEach(pokemon => {
        let pokemonCard = document.createElement('article')
        
        let pokemonName = document.createElement('p');
        pokemonName.innerHTML = `${pokemon.name}`;

        let pokemonImg = document.createElement('div');
        pokemonImg.innerHTML = `<img src="${pokemon.image}">`;

        let nameInput = document.createElement('input')
        nameInput.setAttribute('type', 'text'); 
        nameInput.placeholder = 'Skriv in namn på pokemon';

        let removeButton = document.createElement('button');
        removeButton.innerText = 'Kicka från laget';

        pokemonCard.classList = 'my-pokemon-card';
        pokemonName.classList = 'pokemon-name'; 
        pokemonImg.classList = 'pokemon-img';
        nameInput.classList = 'name-input'; 
        removeButton.classList = 'remove-button';
      
        pokemonCard.append(pokemonName, pokemonImg, nameInput, removeButton);
        myPokemonContainer.append(pokemonCard);
    }); 
}

function renderReserveList() {
    const reserveListContainer = document.querySelector('.my-reserve-list-container')
    reserveListContainer.innerHTML = "";

        reserveList.forEach(pokemon => {
        let pokemonCard = document.createElement('article');

        let pokemonName = document.createElement('p');
        pokemonName.innerHTML = `${pokemon.name}`;

        let pokemonImg = document.createElement('div');
        pokemonImg.innerHTML = `<img src="${pokemon.image}">`;

        let addButton = document.createElement('button');
        addButton.innerText = 'Lägg till i laget';

        let removeButton = document.createElement('button')
        removeButton.innerText = 'Ta bort'

        pokemonCard.classList = 'reserve-pokemon-card';
        pokemonName.classList = 'pokemon-name';
        pokemonImg.classList = 'pokemon-img';
        addButton.classList = 'add-button'; 
        removeButton.classList = 'remove-button';

        pokemonCard.append(pokemonName, pokemonImg, addButton, removeButton);
        reserveListContainer.append(pokemonCard);
  
    })
}




//PRIO 1
//fixa html css så att sidan är större än vad den är 

//text som påminner användare om att man har för få i sitt lag. 

//RenderMyteam 
//Fixa; 
//Input => pushar ut namnet i en <p>-tagg
//removebutton => ta bort pokemon från listan 


//renderRerserveList 
//fixa; 
//addbutton => Lägga till en pokemon till myTEAM 
//removebutton => ta bort en reserv från listan  

//lägga in alla bilder på API med  1279 st  


//PRIO 2
//fixa alll css på sidan så den är snygg
//fixa responsiviteten på sidan från smal till större skärm 
