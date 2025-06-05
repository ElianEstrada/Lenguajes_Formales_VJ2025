import express from 'express';
import analyzeRouter from './routes/analyze.route';

const app = express(); // Crea el servidor
const PORT = 3000;

app.use(express.text());
app.use(analyzeRouter);

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});