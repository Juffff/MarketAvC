window.onload = () => {

    /* function getList(callback) {
         // const server = 'http://localhost:8080/tenders';
         const server = 'https://prozorroanalytics.herokuapp.com/tenders';
         fetch(server)
             .then(response => response.json())
             .then(json => {
                 callback(json);
             })
             .catch(console.log);
     }*/
    function clearTable() {
        document.getElementById('tBody').innerHTML = '';
    }

    const sendButton = document.getElementById('sendButton');
    const txtArea = document.getElementById('txtArea');
    const clearTextAreaButton = document.getElementById('clearTextAreaButton');
    //txtArea.value = 'https://www.ebay.com/itm/Imagine-by-Rubies-DC-Superheroes-Harley-Quinn-Mallet-Costume/123366092297?ssPageName=STRK%3AMEBIDX%3AIT&_trksid=p2057872.m2749.l2649&shqty=1#shIdhttps://www.ebay.com/itm/Imagine-by-Rubies-DC-Superheroes-Harley-Quinn-Mallet-Costume/123366092297?ssPageName=STRK%3AMEBIDX%3AIT&_trksid=p2057872.m2749.l2649&shqty=1#shIdhttps://www.ebay.com/itm/Imagine-by-Rubies-DC-Superheroes-Harley-Quinn-Mallet-Costume/123366092297?ssPageName=STRK%3AMEBIDX%3AIT&_trksid=p2057872.m2749.l2649&shqty=1#shId';



    clearTextAreaButton.addEventListener('click', () => {
       txtArea.value = '';
    });

    sendButton.addEventListener('click', () => {
        let links = txtArea.value.replaceAll('http://','').replaceAll('https://','').split('www.').join('#;#http://www.').replaceAll(/\n/g, '').split('#;#');
        if(links.length > 1){
            links.splice(0, 1);
        }
        if(links.length === 1){
            links = links[0];
        }
        JSON.stringify({data: links});
        sendRequest(links);
    });

    function sendRequest(data) {
        const server = 'http://localhost:8080/parse';
        fetch(server, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({data: data})
        }).then(res=>res.json())
            .then(res => console.log(res));

    }

    String.prototype.replaceAll = function(target, replacement) {
        return this.split(target).join(replacement);
    };
};