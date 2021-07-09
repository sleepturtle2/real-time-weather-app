console.log('Client side javascript file loaded');


//fetch is part of js, not node. since this is running in client side js, it will work. won't work with a node server



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');
const messageFive = document.querySelector('#message-5');

//messageOne.textContent = '';

weatherForm.addEventListener('submit', (event) =>{

    event.preventDefault();
    const location = search.value;

    messageOne.textContent = 'Loading..';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
    response.json().then( (data) => {
        if(data.error)
        {
            messageOne.textContent = data.error;
        }else{
            messageOne.textContent = data.location;
            messageTwo.textContent ="Feels Like: " + data.forecast.feelslike_c;
            console.log(data)
            messageThree.textContent = "Actually is : " + data.forecast.temp_c + " C!"
            messageFour.textContent = "Humidity: " + data.forecast.humidity + " %"


        }
    })
})
})
