export {showPokemonTeamStatus}
export{addMessageToMyTeam}
export{addedMessageToMyReserve}
export{renderMyTeam}
export{renderReserveList}
export{myPokemonTeam}
export{reserveList}


//DOM-element 
const pokemonTeamDivH4Container = document.querySelector("#pokemon-team-div-h4-container")  

//Här hamnar valda pokemons 
let myPokemonTeam = [];
let reserveList = []; 

//Här skapar jag text för lagstatusen i my team lagvy 
const pokemonTeamH4 = document.createElement('h4');
pokemonTeamH4.innerText = 'Here you fill in your teamchampions! You must have 3 team members!'
const pokemonTeamH4FullTeam = document.createElement('h4')
pokemonTeamH4FullTeam.innerText = 'Congratulations! You have now filled your team! Now you are ready to play!'

pokemonTeamDivH4Container.append(pokemonTeamH4FullTeam);
pokemonTeamDivH4Container.append(pokemonTeamH4)
    pokemonTeamH4FullTeam.style.display = 'none'
    pokemonTeamH4.style.display = 'block'


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
    message.innerText = 'Added to my team'
    pokemonButton.insertAdjacentElement('afterend', message)
    
    setTimeout(() => {
        message.remove();
    },2000)
}

//funktion som lägger till text att som säger att laget är fullt och att den läggs in i reserv laget. 
function addedMessageToMyReserve(pokemonButton) {
    const reserveMessage = document.createElement('div');
    reserveMessage.classList.add('reservemessage');
    reserveMessage.innerText = 'Added to the reservteam'
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
        nameInput.placeholder = 'Giv me a nickname...';
        nameInput.maxLength = 10;

        let removeButton = document.createElement('button');
        removeButton.innerText = 'Kick from team';

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
        addButton.innerText = 'Add to my team';

        let removeButton = document.createElement('button')
        removeButton.innerText = 'Remove'

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


