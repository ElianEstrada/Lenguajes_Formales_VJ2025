document.addEventListener('DOMContentLoaded', () => {

    const button = document.getElementById('analyze');
    const editor = document.getElementById('editor');
    const table = document.getElementById('tableBody');
    const pokeTeam = document.getElementById('pokeTeam');
    const clear = document.getElementById('clear');
    const open = document.getElementById('open');
    const save = document.getElementById('save');

    const getSprite = async (name, img) => {
        
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        let result = await response.json();

        let sprite = result.sprites.other['official-artwork'].front_default;

        img.setAttribute('src', sprite);
    }

    clear.addEventListener('click', () => {
        editor.innerHTML = '';
        pokeTeam.innerHTML = '';
        table.innerHTML = '';
    });

    open.addEventListener('click', () => {

        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = ".pklfp";

        fileInput.addEventListener('change', () => {

            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];

                const reader = new FileReader();

                reader.onload = (e) => {
                    const fileContent = e.target.result;
                    editor.innerText = fileContent;
                }

                reader.readAsText(file);
            }

            fileInput.remove();
        });

        fileInput.click();
    });

    save.addEventListener('click', () => {
        const download = document.createElement('a');
        download.href = `data:text/plain;charset=utf-8,${encodeURIComponent(editor.innerText)}`;
        download.download = "archivo.pklfp";
        download.click();
    });

    button.addEventListener('click', async () => {

        localStorage.clear();

        let response = await fetch('http://localhost:3000/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: editor.innerText
        });

        let result = await response.json();

        let textTable = ``;

        result.tokens.forEach((token, index) => {
            textTable += `
            <tr>
                <td> ${index + 1} </td>
                <td> ${token.typeTokenName} </td>
                <td> ${token.lexeme} </td>
                <td> ${token.row} </td>
                <td> ${token.column} </td>
            </tr>
            `;
        });

        table.innerHTML = textTable;

        if (result.errors.length === 0) {

            alert('La entrada esta libre de errores');
            
            editor.innerHTML = result.editor;

            let contentPlayer = ``;
            result.players.forEach((player, index) => {

                contentPlayer += `
                <div class="jugador">
                    <h1> ${player.name} </h1>
                    <div class="team_pokemon">
                `;

                player.teamPokemon.forEach((pokemon) => {

                    contentPlayer += `
                        <div class="pokemon">
                            <p> ${pokemon.name} </p>
                            <img alt="${pokemon.name}" />
                            <p> ${pokemon.type} </p>
                        </div>
                    `;
                });

                contentPlayer += `
                    </div>
                </div>
                `;
            });

            pokeTeam.innerHTML = contentPlayer;

            let images = document.getElementsByTagName('img');

            for(let i = 0; i < images.length - 1; i++) {

                let pokemon = images[i].getAttribute('alt');
                getSprite(pokemon, images[i]);
            }
        } else {

            alert('La entrada tiene errores léxicos');

            localStorage.setItem('errors', JSON.stringify(result.errors));
        }

    });

});