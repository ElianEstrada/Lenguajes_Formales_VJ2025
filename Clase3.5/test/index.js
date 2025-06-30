let objeto = {
    nombre: "Elian",
    edad: 24,
    carrera: "Sistemas"
}

// Objeto Jugador
// Objeto Pokemon

let jugador = {
    nombre: "",
    pokemons: []
}

let pokemon = {
    nombre: "",
    salud: 0,
    ataque: 0,
    defensa: 0,
    ivs: 0
}

let jugadores = [];
let pokemons = [];

let tokens = [ 1, 2, 3, 4, 5, 6, 7, 8];

let nombreJugador = "";
let nombrePokemon = "";
let salud = 0;
let ataque = 0;
let defensa = 0;


tokens.forEach((token) => {

    if (token === 1) {
        nombreJugador = token;
    }
    
    if (token === 3 ) { // token (
        nombrePokemon = "charmander";    
        if (token === 4) { // palabra reservada salud
            if (token === 5) {
                salud = 10;
            }
        }
        if (token == 6) { // ataque
            ataque = 12;
        }

        if (token == 7) { // )
            // termina pokemon

            pokemon = {
                nombre: nombrePokemon,
                salud: salud,
                ataque: ataque,
                defensa: defensa,
                ivs: (salud + ataque + defensa) / 45 * 100
            }

            pokemons.push(pokemon);
        }

        if (token === 8) {// }

            // Termina jugador
            jugador = {
                nombre: nombreJugador,
                pokemons: pokemons
            }

            jugadores.push(jugador);
            pokemons = [];
        } 

    }

});