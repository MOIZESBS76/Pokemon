let currentPokemonId = 1; // Inicializa com o ID do primeiro Pokémon

document.getElementById('searchBtn').addEventListener('click', () => fetchPokemon(document.getElementById('pokemonInput').value));
document.getElementById('prevBtn').addEventListener('click', () => fetchPokemon(--currentPokemonId));
document.getElementById('nextBtn').addEventListener('click', () => fetchPokemon(++currentPokemonId));

function fetchPokemon(query) {
    const url = `https://pokeapi.co/api/v2/pokemon/${query}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon não encontrado. Tente outro nome ou ID.');
            }
            return response.json();
        })
        .then(data => {
            currentPokemonId = data.id; // Atualiza o ID atual do Pokémon
            displayPokemonDetails(data);
        })
        .catch(error => {
            const container = document.getElementById('pokemon-imagens-container');
            container.innerHTML = `<p>${error.message}</p>`;
        });
}

function displayPokemonDetails(pokemon) {
    const container = document.getElementById('pokemon-imagens-container');
    container.innerHTML = `
        <h2>${pokemon.name.toUpperCase()}</h2>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <div class="pokemon-details">
            <div>Altura: ${pokemon.height / 10} m</div>
            <div>Peso: ${pokemon.weight / 10} kg</div>
            <div>Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}</div>
        </div>
    `;

    const typeNames = pokemon.types.map(type => type.type.name);
    changeBackgroundColor(typeNames);
}

function changeBackgroundColor(types) {
    const typeColorMap = {
        fire: '#FF5733',
        water: '#3498DB',
        grass: '#2ECC71',
        electric: '#F1C40F',
        ground: '#E67E22',
        rock: '#95A5A6',
        fairy: '#FF77FF',
        poison: '#8E44AD',
        bug: '#27AE60',
        dragon: '#4AA8D8',
        psychic: '#E84393',
        flying: '#8C8FAA',
        fighting: '#C0392B',
        normal: '#F3F3F3',
        ice: '#AED6F1',
        ghost: '#6F42C1',
        dark: '#34495E',
        steel: '#95A5A6'
    };

    const primaryType = types[0]; // Considera a cor do primeiro tipo como fundo principal
    document.body.style.backgroundColor = typeColorMap[primaryType] || '#FFFFFF';
}

fetchPokemon(currentPokemonId); // Busca o Pokémon inicial ao carregar a página
