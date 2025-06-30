import { Request, Response } from "express";
import { LexicalAnalyzer } from "../Analyzer/LexicalAnalyzer";
import { Token, Type } from "../Analyzer/Token";
import { SyntacticAnalyzer } from "../Analyzer/SyntacticAnalyzer";
import { Error } from "../Analyzer/Error";
import { Transpiler } from "../Analyzer/Transpiler";
import { Instruction } from "../models/abstract/Instruction";

export const home = (req: Request, res: Response) => {
    res.render('pages/index');
}

export const analyze = (req: Request, res: Response) => {
    const body = req.body;

    let scanner: LexicalAnalyzer = new LexicalAnalyzer();

    let tokenList: Token[]  = scanner.scanner(body);

    let parser: SyntacticAnalyzer;
    let errorParser: Error[] = [];
    let transpiler: Transpiler;
    let code: string = '';

    parser = new SyntacticAnalyzer(tokenList);
    parser.parser();

    errorParser = parser.getErrors();

    if (errorParser.length == 0) {
        transpiler = new Transpiler(tokenList);
        transpiler.parser();

        transpiler.getInstructions().forEach((instruction: Instruction) => {
            code += instruction.transpiler();
        });
    }

    res.json({
        tokens: tokenList,
        errors: scanner.getErrorList(),
        syntacticErrors: errorParser,
        traduction: code,
        colors: scanner.getColors()
    });
}