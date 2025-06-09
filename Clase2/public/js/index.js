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


    const file_input = document.getElementById('file_input');
    const editor = document.getElementById('editor');

    file_input.addEventListener('change', (e) => {
        const file = e.target.files[0];

        if (file) {

            let reader = new FileReader();

            reader.onload = (e) => {
                editor.value = e.target.result;
            };

            reader.readAsText(file);
        }
    });


});