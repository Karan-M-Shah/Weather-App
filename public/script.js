const form = document.querySelector('form');
const input = document.querySelector('input');
const messageOne = document.getElementById('message-1');
const messageTwo = document.getElementById('message-2');

form.addEventListener('submit', (e) => {
    /*
     The default behavior for a browser is to refresh 
     the page whenever a form is submitted. 
     event.preventDefault will stop that. 
     Instead we can dynamically add content without needing
     to refresh the page
    */
    e.preventDefault();

    const location = input.value;
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch('http://localhost:3000/weather?address=' + location).then(response => {
        response.json().then(data => {
            if(data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;
            }
        });
    });
});