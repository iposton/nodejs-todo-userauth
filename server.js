import express from 'express';
import routes from './routes/index.js';
import morgan from 'morgan';
import cors from 'cors';
import jsonWT from './utilities/jwt.js';

const app = express();

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use(routes);

// use JWT auth to secure the api
app.use(jsonWT());

//error handler
app.use((err, req, res, next) => {

    console.error(err);
    if (typeof (err) === 'string') {
        // custom application error
        return res.status(400).json({ message: err });
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }
    
    return res.status(500).send(err.message);
});

const port = process.env['PORT'] || 4000;

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
});