import { Request, Response } from 'express';
import path from 'path';

export const ping = (req: Request, res: Response) => {
    //res.status(200).send("pong");
    res.render('pages/index');
}

export const errLex = (req: Request, res: Response) => {
    res.render('pages/errors');
}