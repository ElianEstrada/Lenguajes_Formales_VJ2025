import { Request, Response } from "express";
import { LexicalAnalyzer } from "../Analyzer/LexicalAnalyzer";

export const analyze = (req: Request, res: Response) => {

    const input = req.body;
    let lexicalAnalyzer: LexicalAnalyzer = new LexicalAnalyzer();

    let tokenList = lexicalAnalyzer.scanner(input);
    let errorList = lexicalAnalyzer.getErroList();

    res.json({
        "tokens": tokenList,
        "errors": errorList
    });
}

export const home = (req: Request, res: Response) => {

    let pokemons = [
        {
            name: "venusaur",
            type: "planta"
        },
        {
            name: "charizard",
            type: "fuego"
        },
        {
            name: "dragonite",
            type: "dragon"
        }
    ]

    let jugadores = [
        {
            name: "Elian",
            pokemons: pokemons
        },
        {
            name: "Maria",
            pokemons: pokemons
        },
        {
            name: "PokePlayer250",
            pokemons: pokemons
        }
    ]

    res.render('pages/index', { name: "Elian", jugadores: jugadores });
}