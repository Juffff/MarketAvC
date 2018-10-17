import jsdom from 'jsdom';
import {JSDOM} from 'jsdom';

export default (url, data) => {
    //  const {JSDOM} = jsdom;
    const name = url.replace('www.ebay.com/itm/', '').replace('http://', '').replace('https://', '').split("/")[0].split('-').join(' ');
    let price = '';
    let availability = '';
    let purchased = '';

    const dom = new JSDOM(data.body);
    const body = dom.window.document.body;
    const htmlString = body.innerHTML;
    if (htmlString.indexOf('This listing has ended') !== -1 || htmlString.indexOf('This listing was ended') !== -1) {
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
        price = priceInfoString.split(':')[1].split('\"').join('').replace(',', '').replace('.', ',');
    }
    return {url, name, price, availability, purchased};
}