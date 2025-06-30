import express from 'express';
import analyzeRouter from './routes/analyze.route';

const app = express();

app.use(express.text());
app.use(analyzeRouter);

app.listen(3000, () => {
    console.log("El servidor esta escuchando en: http://localhost:3000");
});