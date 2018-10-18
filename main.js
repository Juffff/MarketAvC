import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import requester from './requester';
import linkParser from './linkParser';
import dataParser from './dataParser';

const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.post('/parse', (req, res) => {
    const url = req.body.data;
    requester(url, 1500)(data => {
        console.log('OK');
        res.send(dataParser(linkParser(url), url, data), 200)
    });
});

app.listen(8080, () => {
    console.log(`Server is running on 8080`);
});



