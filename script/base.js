import { renderUI } from "./fetching.js"
import { pokemonList } from "./fetching.js"
import { showPokemonTeamStatus } from "./function.js"
import { addMessageToMyTeam } from "./function.js"
import { addedMessageToMyReserve } from "./function.js"
import { renderMyTeam } from "./function.js"
import { renderReserveList } from "./function.js"
import { myPokemonTeam } from "./function.js"
import { reserveList} from "./function.js"

//Hämta element från DOM
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


//kalla på funktionen för att rendera pokemon på sidan 

renderUI();

//funktionen som körs när använder skriver i sökfältet
findPokemonInput.addEventListener('keyup', async() => {
    const searchString = findPokemonInput.value;
    if (findPokemonInput.value.length > 1) {
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
            pokemonButton.innerText = 'Add Pokèmon';
    
            pokemonCard.classList ='pokemon-card';
            pokemonName.classList = 'pokemon-name';
            pokemonImg.classList = 'pokemon-img';
            pokemonButton.classList ='pokemon-button';
            
            pokemonCard.append(pokemonName, pokemonImg, pokemonButton);
            pokemonContainer.append(pokemonCard);
    
            //lägg till eventlistner för att lägga till pokemon i MypokemonTeam samt lägga till text som meddelande till användaren
            pokemonButton.addEventListener('click', () => {
                if (myPokemonTeam.length < 3) {
                    addMessageToMyTeam(pokemonButton);
                    myPokemonTeam.push({ ...pokemon });
    
                } else {
                    addedMessageToMyReserve(pokemonButton);
                    reserveList.push(pokemon);
                    
                }
                renderMyTeam();
                renderReserveList();
                showPokemonTeamStatus();

            })
   
        })
    };
});


