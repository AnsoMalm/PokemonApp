export { renderUI }
export { pokemonList }

//Url till API:et som ska användas 
const nameUrl = 'https://pokeapi.co/api/v2/pokemon?limit=1279&offset=0'

//array för att lägra pokemons-inforamtionen
let pokemonList = [];


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