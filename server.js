import express from 'express';
import routes from "./routes/index.js";
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(routes);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

const port = process.env['PORT'] || 4000;

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});