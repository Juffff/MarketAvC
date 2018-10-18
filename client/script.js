window.onload = () => {

    String.prototype.replaceAll = function(target, replacement) {
        return this.split(target).join(replacement);
    };

    function clearTable() {
        document.getElementById('tBody').innerHTML = '';
    }

    const sendButton = document.getElementById('sendButton');
    const txtArea = document.getElementById('txtArea');
    const clearTextAreaButton = document.getElementById('clearTextAreaButton');

    clearTextAreaButton.addEventListener('click', () => {
       txtArea.value = '';
    });

    sendButton.addEventListener('click', () => {
        clearTable();
        let links = txtArea.value.replaceAll('http://','').replaceAll('https://','').split('www.').join('#;#http://www.').replaceAll(/\n/g, '').split('#;#');
        if(links.length > 1){
            links.splice(0, 1);
            links.forEach(el => {
                sendRequest(el);
            });
        }
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
            .then(res => {
                createTr(res, document.getElementById('tBody'));
            });
    }

    const createTd = (data) => {
        const el = document.createElement('td');
        el.innerHTML = data;
        return el;
    };

    const createTr = (data, tBody) => {
        const tr = document.createElement('tr');
        console.log(tr);
        const urlTd = createTd(data.url);
        const name = createTd(data.name);
        const price = createTd(data.price);
        const availability = createTd(data.availability);
        const purchased = createTd(data.purchased);
        tr.appendChild(urlTd);
        tr.appendChild(name);
        tr.appendChild(price);
        tr.appendChild(availability);
        tr.appendChild(purchased);

        tBody.appendChild(tr);
    };


};