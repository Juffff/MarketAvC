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
/*app.get('/', (req, res) => {
    const link = 'https://www.ebay.com/itm/Imagine-by-Rubies-DC-Superheroes-Harley-Quinn-Mallet-Costume/123366092297?ssPageName=STRK%3AMEBIDX%3AIT&_trksid=p2057872.m2749.l2649';
    const name = link.replace('www.ebay.com/itm/','').replace('http://','').replace('https://','').split("/")[0].split('-').join(' ');
    let price = '';
    let availability = '';
    let purchased = '';

    got(link).then(data => {
        const dom = new JSDOM(data.body);
        const body = dom.window.document.body;
        const htmlString = body.innerHTML;
        if(htmlString.indexOf('This listing has ended') !== -1 || htmlString.indexOf('This listing was ended') !== -1){
            price = "Undefined";
            availability = "This listing has ended";
            purchased = "Undefined";
        } else {
            const remainQtyIndex = htmlString.indexOf('\"remainQty\"');
            const totalBidsIndex = htmlString.indexOf('\"totalBids\"');
            const qtyInfoString = htmlString.substring(remainQtyIndex, totalBidsIndex);
            availability = qtyInfoString.split(',')[0].split(':')[1];
            purchased = qtyInfoString.split(',')[4].split(':')[1];
            const binPriceOnlyIndex = htmlString.indexOf('\"binPriceOnly\"');
            const convertedBinPriceIndex = htmlString.indexOf('\"convertedBinPrice\"');
            const priceInfoString = htmlString.substring(binPriceOnlyIndex, convertedBinPriceIndex);
            price = priceInfoString.split(':')[1].split('\"').join('').replace(',','').replace('.',',');
        }
        console.log(price);
        console.log(availability);
        console.log(purchased);

        res.send(200);
    });



});*/

app.post('/parse', (req, res) => {
    const data = req.body.data;
    if(Array.isArray(data)){
        /*Promise.all([p1, p2, p3]).then(values => {
            console.log(values);
        });*/
        Promise.all(data.map(el => requester(el))).then(data => console.log(data));

      //  data.map(el => requester(el).then(data => console.log(data)));
      //  Promise.all().then(data => console.log(data));
        res.send({'dd':'OO'});
    } else {
        const url = req.body.data;
        console.log(url);
        requester(url).then(data => {
             res.send(dataParser(linkParser(url), url, data), 200);
        });
    }
});



app.listen(8080, () => {
    console.log(`Server is running on 8080`);
});



