import { Request, Response } from 'express';
import { LexicalAnalyze } from '../Analizator/LexicalAnalyzer';
import { Token } from '../Analizator/Token';

export const analyze = (req: Request, res: Response) => {

    const input = req.body;

    let lexicalAnalyze: LexicalAnalyze = new LexicalAnalyze();

    let tokenList: Token[] = lexicalAnalyze.scanner(input);

    res.json({
        "tokens": tokenList,
        "errors": lexicalAnalyze.getErrorList()
    });
}