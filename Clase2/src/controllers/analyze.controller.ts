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

export const ping = (req: Request, res: Response) => {
    res.send("pong");
}