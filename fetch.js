
async function renderUI() {
    let pokemons = await GetAPI(nameUrl);
   
    pokemons.forEach(async pokemon => {
        let response = await fetch(pokemon.url);
        let data = await response.json();

        const pokemonInfo = {
            name: data.name,
            image: data.sprites.front_default

        }
        
        pokemonList.push(pokemonInfo)

      
    });

};

export { renderUI }