import { Pokemon } from "./Pokemon";

class Player {

    private name: string;
    private listPokemon: Pokemon[];
    private teamPokemon: Pokemon[];

    constructor(name: string) {
        this.name = name;
        this.listPokemon = [];
        this.teamPokemon = [];
    }

    addPokemon(pokemon: Pokemon) {
        this.listPokemon.push(pokemon);
    }

    getName(): string {
        return this.name;
    }

    getListPokemon(): Pokemon[] {
        return this.listPokemon;
    }

    getTeamPokemon() {

        // Get Team Pokemon

        this.listPokemon.sort( (pokemon1: Pokemon, pokemon2: Pokemon) => {
            if (pokemon2.getIvs() < pokemon1.getIvs()) {
                return -1;
            } else if (pokemon2.getIvs() > pokemon1.getIvs()) {
                return 1;
            } else {
                return 0;
            }

        });

        let flags = [false, false, false, false, false, false];
        let type = -1;

        this.listPokemon.forEach((pokemon: Pokemon) => {

            switch(pokemon.getType()) {
                case 'planta':
                    type = 0;
                    break;
                case 'agua':
                    type = 1;
                    break;
                case 'dragon':
                    type = 2;
                    break;
                case 'fuego':
                    type = 3;
                    break;
                case 'normal':
                    type = 4;
                    break;
                case 'psiquico':
                    type = 5;
                    break;
            }

            
            if (!flags[type]) this.teamPokemon.push(pokemon);
            flags[type] = true;
        });
    }
}

export { Player }