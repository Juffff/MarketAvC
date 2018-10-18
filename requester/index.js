import got from 'got';

export default (url, delay) => {
    return function (callback) {
        got(url).then(data => setTimeout(() => callback(data), delay));
    }
}