console.log('Client side javascript file loaded'); 


//fetch is part of js, not node. since this is running in client side js, it will work. won't work with a node server



const weatherForm = document.querySelector('form'); 
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1'); 
const messageTwo = document.querySelector('#message-2'); 

//messageOne.textContent = ''; 

weatherForm.addEventListener('submit', (event) =>{
    
    event.preventDefault(); 
    const location = search.value;
    
    messageOne.textContent = 'Loading..'; 
    messageTwo.textContent = ''; 
    
    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then( (data) => {
        if(data.error)
        {
            messageOne.textContent = data.error; 
        }else{
            messageOne.textContent = data.location; 
            messageTwo.textContent = data.forecast; 

            
        }
    })
}) 
})