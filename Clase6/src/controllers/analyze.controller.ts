import { Request, Response } from "express";
import { AnalizadorLexico } from "../Analisador/AnalizadorLexico";

export const analyze = (req: Request, res: Response) => {

    console.log(req.body);

    let scanner: AnalizadorLexico = new AnalizadorLexico();

    scanner.scanner(req.body);

    res.json({
        "tokens": scanner.getTokenList(),
        "errors": scanner.getErrorList()
    });
}