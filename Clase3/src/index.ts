import express from 'express';
import appRouter from './routes/application.route';
import analyzeRouter from './routes/analyze.route';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.text());

app.use(appRouter);
app.use(analyzeRouter);

app.listen(PORT, () => {
    console.log(`The server listen on port: ${PORT}`);
});