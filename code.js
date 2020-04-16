const poke_container = document.getElementById('poke_container');
const pokemons_number = 2000;
const colors = {
    fire: '#ff7777',
    grass: '#6bd66b',
    electric: '#fae167',
    water: '#81d7ff',
    ground: '#bd9166',
    rock: '#919191',
    fairy: '#f2a9ff',
    poison: '#b875cc',
    bug: '#fdbd63',
    dragon: '#62ebe4',
    psychic: '#ffd905',
    flying: '#ffffff',
    fighting: '#424242',
    normal: '#'
}

const main_types = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemons_number; i++) {
        await getPokemon(i);
    }
}


let search = document.getElementById('search');

let text = search.value

let arrText = text.split('');

// console.log(arrText);


search.addEventListener('input', fetchPokemons(text));


const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const res = await fetch(url);
    const pokemon = await res.json();

    const poke_types = pokemon.types.map(el => el.type.name);
    let type = main_types.find(type => poke_types.indexOf(type) > -1);

    let name = pokemon.name

    // let matches = pokemon.filter(poke => {
    //     const regex = RegExp(`^$`)
    // })

    let arrType = type.split('');

    let arrName = name.split('');


    text = arrText.join('');


    // console.log(text);


    arrCheckN = arrName.splice(0, text.length);

    arrCheckT = arrType.splice(0, text.length);

    type = arrCheckT.join('');

    name = arrCheckN.join('');

    console.log(text, name, type);


    // console.log(name);
    if (name == text || type == text) {
        createPokemonCard(pokemon);
    }
}

fetchPokemons();

let btn = document.querySelector('.btn');


function createPokemonCard(pokemon) {
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const poke_types = pokemon.types.map(el => el.type.name);
    const type = main_types.find(type => poke_types.indexOf(type) > -1);
    const color = colors[type];


    // pokemonElement.style.backgroundColor = color;

    pokemonElement.addEventListener('mouseover', () => {
        pokemonElement.style.background = '#eee';
        pokemonElement.style.background = color;
        pokemonElement.style.cursor = 'pointer';
        pokemonElement.style.transition = '.3s';
    })

    pokemonElement.addEventListener('mouseleave', () => {
        pokemonElement.style.background = '#eee';
    })

    pokemonElement.addEventListener('click', () => {
        pokemonElement.classList.toggle('active');
        pokemonElement.style.background = color;

    })


    const pokeInnerHTML = `
    <div class="img-container">
    <img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png">
    </div>
    <div class="info">
    <h3 class="name">${name}</h3>
    <p class="type">Type: <span>${type}</span></p>
    <span class="number">#${pokemon.id.toString().padStart(3,'0')}</span>
    </div>
    <div class="content">
    <p>Height: <span>${pokemon.height}</span></p>
    <p>Weight: <span>${pokemon.weight}</span></p>
    <p>Attack: <span>${pokemon}</span></p>
    <p>Defense: <span>${pokemon}</span></p>
    </div>
    
    `;

    pokemonElement.innerHTML = pokeInnerHTML;
    poke_container.appendChild(pokemonElement);


}