// Vamos a crear un servidor web

import express from 'express'
import { Request, Response } from 'express'

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
    res.send("Hola Mundo");
});

app.get('/ping', (req: Request, res: Response) => {
    res.json({
        "nombre": "pong"
    })
});

app.listen(PORT, () => {
    console.log(`El servidor escucha en el puerto: ${PORT} del cruso LFP`);
});
