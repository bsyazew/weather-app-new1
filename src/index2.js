let now = document.querySelector(`.today`);

let rn = new Date();
let date = rn.getDate();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[rn.getDay()];
let hours = rn.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = rn.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

now.innerHTML = `${day}, ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function getForecast(coordinates) {
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiURL);
  axios.get(apiURL).then(displayForecast);
}

function showTodaystemp(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  iconElement.setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#displayed-city").innerHTML = response.data.name;
  document.querySelector("#todays-temperature").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTodaystemp);
}

function handleSubmit(event) {
  event.preventDefault();

  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
            <div class="col-2">
              <p style="display: inline" class="forecast-dates">${formatDay(
                forecastDay.dt
              )}</p>
               <div>
               
                    <img
                    src="https://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png" 
                    alt="Clouds"
                    
                    id="forecast-icon"></img></div>
              <div style="display: block" class="forecast-temp">
                <span class="forecast-temp-max"> ${Math.round(
                  forecastDay.temp.max
                )}° </span>
                <span class="forecast-temp-min" >${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
              
            </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todays-temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
}

let celsiusTemperature = null;

searchCity("Ethiopia");
