import express from 'express';
import pingRouter from './routes/ping.route';
import analyzeRouter from './routes/analyser.route';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(cors());
app.use(express.static('public'));
app.use(express.text());
app.use(express.json());
app.use(pingRouter);
app.use(analyzeRouter);

app.listen(PORT, () => {
    console.log(`The server is running on http://localhost:${PORT}`);
});