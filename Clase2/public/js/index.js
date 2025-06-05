document.addEventListener('DOMContentLoaded', () => {

    const getPokemon = async (name, img) => {

        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        let result = await response.json();

        let sprite = result.sprites.other['official-artwork'].front_default;

        img.setAttribute('src', sprite);
    }

    const imagenes = document.getElementsByTagName('img');

    for (let i = 0; i < imagenes.length; i++) {

        let pokemon = imagenes[i].getAttribute('id');
        console.log(pokemon);

        getPokemon(pokemon, imagenes[i]);
    }
});