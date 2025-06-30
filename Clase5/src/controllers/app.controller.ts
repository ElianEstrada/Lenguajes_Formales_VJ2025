import { Request, Response } from "express";
import { LexicalAnalyze } from "../analyzator/LexicalAnalyze";
import { Career } from "../models/Career";
import { getCareers } from "../utils/StructureCareer";

export const home = (req: Request, res: Response) => {
    res.render('pages/index');
}

export const analyze = (req: Request, res: Response) => {
    const body = req.body;

    let scanner: LexicalAnalyze = new LexicalAnalyze();

    scanner.scanner(body);
    
    let careers: Career[] = getCareers(scanner.getTokenList());

    res.json({
        "tokens": scanner.getTokenList(),
        "errors": scanner.getErrorList(),
        "editor": scanner.getColors(),
        "careers": careers
    });
}

// Crear el Enpoint Pensum
export const pensum = (req: Request, res: Response) => {

    const id = req.params.id;

    res.render('pages/carrera', {id});
}