//Search city and display current temp

function search(city) {
  let apiKey = "5238f8c1d406c12784c08d3c68d9a8e7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(showTemperature);
}


function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;

  search(city);
}

  let cityForm = document.querySelector("#search-city-form");
  cityForm.addEventListener("submit", handleSubmit)



function showTemperature(response) {
 document.querySelector("#current-city").innerHTML = response.data.name;
 document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);

 document.querySelector("#current-temp-high").innerHTML = Math.round(response.data.main.temp_max);
 document.querySelector("#current-temp-low").innerHTML = Math.round(response.data.main.temp_min);
 console.log(response.data);

 document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
 document.querySelector("#humidity-wind").innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%, Wind: ${Math.round(response.data.wind.speed)} m/s`;

 celsiusTemperature = response.data.main.temp;

 let icon = response.data.weather[0].icon;

 document.querySelector("#current-weather-img").setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
 document.querySelector("#current-weather-img").setAttribute("alt", response.data.weather[0].description);

 

 formatDate(response.data.dt * 1000);

}


//Day and time
function formatDate(timestamp) {
 let date = new Date(timestamp);

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let today = days[date.getDay()];
        
  let hours = date.getHours();
  if (hours <10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes <10) {
    minutes = `0${minutes}`;
  }


  let currentDay = document.querySelector("#current-day");
  let currentTime = document.querySelector("#current-time");

  currentDay.innerHTML = `${today}`;
  currentTime.innerHTML = `${hours}:${minutes}`;


  if(hours <=11) {
    currentTime.innerHTML = `${hours}:${minutes} am`;
   } else {
    currentTime.innerHTML = `${hours}:${minutes} pm`;
   }
  }

function showFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let currentTemperature = document.querySelector("#current-temperature");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

  let celsiusTemperature = null;

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", showCelsiusTemperature);


  search("New York");
