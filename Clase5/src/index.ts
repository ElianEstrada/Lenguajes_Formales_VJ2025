import express from 'express';
import router from './routes/app.route';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.text());
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
    console.log(`The server listen in: http://localhost:3000`);
});