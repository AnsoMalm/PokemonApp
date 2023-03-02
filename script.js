//Hämta element från DOM
//const firstPageText =  document.querySelector('#upper-text')
const championButton = document.querySelector('#champion-btn')
const teamButton =  document.querySelector('#team-btn')
let pageOne = document.querySelector('.vy-1')
let pageTwo = document.querySelector('.vy-2-invisible')
const pokemonContainer = document.querySelector('.pokemon-container')
const findPokemonInput = document.querySelector('.search-pokemon') 
const pokemonTeamDivH4Container = document.querySelector("#pokemon-team-div-h4-container")  

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

const pokemonTeamH4 = document.createElement('h4');
pokemonTeamH4.innerText = 'Här fyller du på ditt lag! Du ska ha 3 lagmedlemmar!'
const pokemonTeamH4FullTeam = document.createElement('h4')
pokemonTeamH4FullTeam.innerText = 'Grattis, nu har du fyllt ditt lag!'

pokemonTeamDivH4Container.append(pokemonTeamH4FullTeam);
pokemonTeamDivH4Container.append(pokemonTeamH4)
    pokemonTeamH4FullTeam.style.display = 'none'
    pokemonTeamH4.style.display = 'block'


//Url till API:et som ska användas 
const nameUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1279&offset=0'


//array för att lägra pokemons-inforamtionen
let pokemonList = [];

//Här hamnar valda pokemons 
let myPokemonTeam = [];
let reserveList = []; 

//Hämta data från pokemon API
async function GetAPI(nameUrl) {
    try {
        const response = await fetch(nameUrl)
        const data = await response.json()
        let dataResult = data.results;
        return dataResult;

    } catch(error) {
        console.log(error.message) 
        const errorMessage = document.createElement('p')
        errorMessage.innerText = 'Det gick inte att hämta datan. Försök igen om en stund'
        let bodyHeader = document.querySelector('.body_header')
        bodyHeader.append(errorMessage)
        return null
    }
    
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


    }
 
//kalla på funktionen för att rendera pokemon på sidan 

renderUI();

//funktionen som körs när använder skriver i sökfältet
findPokemonInput.addEventListener('keyup', async() => {
    const searchString = findPokemonInput.value;
    if (findPokemonInput.value.length > 2) {
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

   


//Visar lagets status i myPokemonTeam, ifall du kan fylla på mer i laget eller inte

function showPokemonTeamStatus () {
    if (myPokemonTeam.length < 3 ) {
        pokemonTeamH4.style.display = 'block'
        pokemonTeamH4FullTeam.style.display = 'none'
    }
    else {
        pokemonTeamH4FullTeam.style.display = 'block'
        pokemonTeamH4.style.display = 'none'
    }
} 

//funktion som lägger till text att man har lagt till en pokemon till sitt team 

function addMessageToMyTeam (pokemonButton) {
    const messageContainer = document.createElement('div')
    messageContainer.classList = ('message-container')
    const message = document.createElement('p');
    message.classList.add('message');
    message.innerText = 'Lagt till i ditt lag'
    pokemonButton.insertAdjacentElement('afterend', message)
    setTimeout(() => {
        message.remove();
    },2000)
//insertAdjacentElement
}

//funktion som lägger till text att som säger att laget är fullt och att den läggs in i reserv laget. 
function addedMessageToMyReserve(pokemonButton) {
    const reserveMessage = document.createElement('div');
    reserveMessage.classList.add('reservemessage');
    reserveMessage.innerText = 'Tillagd i reserv'
    pokemonButton.insertAdjacentElement('afterend', reserveMessage);

    setTimeout(() => {
        reserveMessage.remove(); 
    },2000)
}


//Funktion som skapar MyTeam 
function renderMyTeam() {
    const myPokemonContainer = document.querySelector('.my-team-pokemon-container')
    myPokemonContainer.innerHTML = '';

    myPokemonTeam.forEach(pokemon => {
        let pokemonCard = document.createElement('article')
        
        let pokemonName = document.createElement('p');
        pokemonName.innerHTML = `${pokemon.name}`;

        let pokemonNickName = document.createElement('p')
        let pokemonImg = document.createElement('div');
        pokemonImg.innerHTML = `<img src="${pokemon.image}">`;

        let nameInput = document.createElement('input')
        nameInput.placeholder = 'Ge ett smeknamn...';
        nameInput.maxLength = 10;

        let removeButton = document.createElement('button');
        removeButton.innerText = 'Kicka från laget';

        pokemonCard.classList = 'my-pokemon-card';
        pokemonName.classList = 'pokemon-name'; 
        pokemonImg.classList = 'pokemon-img';
        nameInput.classList = 'name-input'; 
        removeButton.classList = 'remove-button';
      
        pokemonCard.append(pokemonName, pokemonNickName, pokemonImg, nameInput, removeButton,);
        myPokemonContainer.append(pokemonCard);
        
        // om det finns ett nickname sedan tidigare
        if( pokemon.nickname ) {
            // skriv in det i p-taggen
            pokemonNickName.innerText = pokemon.nickname
        }
        //Namn input för pokemon. 
        nameInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                let inputNickname = nameInput.value 
                pokemon.nickname = nameInput.value
                pokemonNickName.innerText = inputNickname
                nameInput.value = '';
            }
        })
        //Knapp som tar bort pokemon från MyTeam och skickar den ner till Reserv-laget 
        removeButton.addEventListener('click', () => {
            reserveList.push(pokemon);
            myPokemonTeam.splice(myPokemonTeam.indexOf(pokemon), 1);
            renderMyTeam();
            renderReserveList();
            showPokemonTeamStatus();
        })
    }); 
}
//funktion som skapar reserv-listan 
function renderReserveList() {
    const reserveListContainer = document.querySelector('.my-reserve-list-container')
    reserveListContainer.innerHTML = "";

        reserveList.forEach(pokemon => {
        let pokemonCard = document.createElement('article');

        let pokemonName = document.createElement('p');
        pokemonName.innerHTML = `${pokemon.name}`;

        let pokemonNickName = document.createElement('p')

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

        pokemonCard.append(pokemonName, pokemonNickName, pokemonImg, addButton, removeButton);
        reserveListContainer.append(pokemonCard);

         // om det finns ett nickname sedan tidigare
         if(pokemon.nickname) {
            // skriv in det i p-taggen
            pokemonNickName.innerText = pokemon.nickname
         }
        //Knapp som lägger till i MyTeam 
        addButton.addEventListener('click', () => {
            if (myPokemonTeam.length < 3) {
                myPokemonTeam.push({ ...pokemon });
                reserveList.splice(reserveList.indexOf(pokemon), 1);
                renderMyTeam();
                renderReserveList();
                showPokemonTeamStatus();
            }
         
        })
        //Knapp som tar bort från reservlistan helt o hållet. 
        removeButton.addEventListener('click', () => {
            reserveList.splice(reserveList.indexOf(pokemon), 1)
            pokemonCard.remove();
            showPokemonTeamStatus();
        })
  
    })
}





//fixa koden så att dem ligger i olika kataloger. 



//PRIO 2
//fixa alll css på sidan så den är snygg
//fixa responsiviteten på sidan från smal till större skärm 

//Göra codereview  CHECK!
//göra 2 tester CHECK 1 - 1 test kvar!


//Sista prio 4
//Lägga över i main (när allt är färdigt)
//lägga upp det på en sida, antingen surge.sh eller github.page 
//fixa rapporten 

