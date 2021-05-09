const search = document.querySelector(".search");
const form = document.querySelector("form");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const clearBtn = document.querySelector('.clearBtn');
console.log(messageTwo);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading....'

  fetch(`http://localhost:4000/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageTwo.textContent = data.error;
        messageOne.textContent = '';
      } else {
        const forecast = `${data.weather_descriptions}. Temperature is ${data.temperature} and wind speed is ${data.speed}`;
        messageOne.textContent = '';
        messageOne.textContent = data.location;
        messageTwo.textContent = forecast;
      }
      console.log(data);
    });
});

clearBtn.addEventListener('click',function(e){
  e.preventDefault();
  messageOne.textContent = '';
  messageTwo.textContent = '';
  search.value = '';
})