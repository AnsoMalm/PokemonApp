
const buttons = {
	championButton: document.querySelector('#champion-btn'),
	teamButton: document.querySelector('#team-btn')
}
const body = document.querySelector('body')
const pokemonList = document.querySelector('#pokemon-list-container')


buttons.championButton.addEventListener('click', () => { 
	//console.log('button clicked')
	const overlay = document.createElement('div')
	const content = document.createElement('section')

	overlay.classList.add('overlay')
	content.innerText = 'Pokemon-list'

	overlay.append(content)

	overlay.addEventListener('click', () => {
		console.log('Clicked overlay')
		overlay.remove()
	})

	content.addEventListener('click', event => {
		console.log('Clicked content. Overlay should NOT close')
		event.stopPropagation()
	})

	body.append(overlay)

})


/*
function addPokemonlist() {
	//const newDiv = document.createElement('div');
	const label = document.createElement('label')
	label.innerText = 'Sök efter din Pokemon'
	const inputField = document.createElement('input')
	inputField.innerText = 'Sök i raden här...' 

//newDiv.append(pokemonList)
label.append(pokemonList)
inputField.append(pokemonList)
}
addPokemonlist()
/*
function addMyTeam() {
	const container2 = document.createElement('div');

}

//my-team-container

/*	<section id="Pokemon-list-container">
			<article id="Pokemon-list">
				<label>Sök efter din Pokemon:</label>
				<input id="pokemon-sök" type="text" placeholder="Sök i raden här...">
				<div id="pokemon-container">
					<div id="pokemon-info">
					<button id="pic-me">Välj mig</button>
					<button id="pic-me">Välj mig</button>
					<button id="pic-me">Välj mig</button>
					</div>
				</div>
			</article>
		</section>*/

