import express from 'express';
import cors from 'cors';
import got from 'got';
import bodyParser from 'body-parser';
import jsdom from 'jsdom';
const {JSDOM} = jsdom;
const app = express();

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    got(`https://www.ebay.com/itm/Imagine-by-Rubies-DC-Superheroes-Harley-Quinn-Mallet-Costume/123366092297?ssPageName=STRK%3AMEBIDX%3AIT&_trksid=p2057872.m2749.l2649`).then(data => {
        const dom = new JSDOM(data.body);
        const body = dom.window.document.body;
        res.send(body.innerHTML);
    });



});
app.listen(8080, () => {
    console.log(`Server is running on 8080`);
});



