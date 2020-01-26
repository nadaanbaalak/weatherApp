const weatherForm = document.querySelector('form');
const messageOne = document.getElementById('message-1');
messageTwo = document.getElementById('message-2');

weatherForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    messageTwo.innerText=" ";
    messageOne.innerText = "Loading....";
    
    const searchLocation = document.querySelector('input').value;

        fetch(`/weather?address="${searchLocation}"`).then((response)=>{
            response.json().then((data)=>{
                if(data.error)
                {
                    messageOne.innerText = data.error;
                }
                else{
                    messageOne.innerHTML = `<b>Place </b>: ${data.cityName}`;
                    messageTwo.innerText = `It is ${data.summary} with current temperature being ${data.currentTemp} degrees celcius. There's a ${data.rainProbability}% chance of raining.`
                }
            })
        })    
})
