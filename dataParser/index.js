import ebayParser from './ebayParser';

export default (type, url, data) => {
    if(type === 'ebay'){
        return ebayParser(url, data);
    }
}
