import { Request, Response } from "express";
import { LexicalAnalyzer } from "../LexicalAnalyzer/LexicalAnalyzer";
import { Token, Type } from "../LexicalAnalyzer/Token";
import { Player } from "../models/Player";
import { Pokemon } from "../models/Pokemon";

export const analyze = (req: Request, res: Response) => {
    const body = req.body;

    let lexicalAnalyzer: LexicalAnalyzer = new LexicalAnalyzer();

    let tokenList = lexicalAnalyzer.scanner(body);
    
    let players: Player[] = getTeams(tokenList);
    let editor: string = lexicalAnalyzer.getColors();

    res.status(200).json({
        "players": players,
        "editor": editor,
        "tokens": tokenList,
        "errors": lexicalAnalyzer.getErrorList()
    });
}

const getTeams = (tokenList: Token[]) => {

    let listPlayers: Player[] = [];

    let player: Player;
    let pokemon: Pokemon;

    let flagPlayer: boolean = false;
    let flagPokemon: boolean = false;
    let flagHealth: boolean = false;
    let flagAttack: boolean = false;
    let flagDefense: boolean = false;

    tokenList.forEach((item: Token, index: number) => {

        if (item.getLexeme() == 'Jugador'){
            flagPlayer = true;
        }

        if (flagPlayer && item.getNumberType() == Type.STRING) {
            player = new Player(item.getLexeme().substring(1, item.getLexeme().length - 1));
            flagPlayer = false;

        } else if (item.getNumberType() == Type.STRING) {
            flagPokemon = true;
            pokemon = new Pokemon(item.getLexeme().substring(1, item.getLexeme().length - 1));

        }

        if (flagPokemon) {
            // Pokemons
            if (item.getNumberType() == Type.RESERVED_WORD) {

                switch(item.getLexeme()) {
                    case 'salud':
                        flagHealth = true;
                        break;
                    case 'ataque':
                        flagAttack = true;
                        break;
                    case 'defensa':
                        flagDefense = true;
                        break;
                    default:
                        pokemon.setType(item.getLexeme());
                        break;
                }
            } 
            
            if (item.getNumberType() == Type.NUMBER) {
                if(flagHealth) {
                    pokemon.setHealth(Number(item.getLexeme()));
                    flagHealth = false;
                }

                if(flagAttack) {
                    pokemon.setAttack(Number(item.getLexeme()));
                    flagAttack = false;
                }

                if (flagDefense) {
                    pokemon.setDefense(Number(item.getLexeme()));
                    flagDefense = false;
                }
            }

            if (item.getNumberType() == Type.PAR_CLOSE) {
                pokemon.calculateIvs();
                player.addPokemon(pokemon);
                flagPokemon = false;
            }
        }

        if (item.getNumberType() == Type.KEY_CLOSE) {
            player.getTeamPokemon();
            listPlayers.push(player);
        }
    });

    return listPlayers;
}