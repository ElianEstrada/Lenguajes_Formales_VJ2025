import express from 'express';
import analyzeRouter from './routes/analyze.route';

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.text());

app.use(analyzeRouter);

app.listen(3000, () => {
    console.log("The server is listening on: http://localhost:3000");
});