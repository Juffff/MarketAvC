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
};