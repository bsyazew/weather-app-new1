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

function showTodaystemp(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  document.querySelector("#place").innerHTML = response.data.name;
  document.querySelector("#todays-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTodaystemp);
}

function handleSubmit(event) {
  event.preventDefault();
  //let searchInput = document.querySelector("#exampleFormControlInput1");

  //let place = document.querySelector("#place");
  //if (searchInput.value) {
  ////place.innerHTML = `${searchInput.value}`;
  //} else {
  ////place.innerahtml = null;
  //  alert(`Please enter city`);

  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }

  let city = document.querySelector("#exampleFormControlInput1").value;
  searchCity(city);
}
// COME BACK O IN WEEK 6
//function searchLocation(position) {
// let apiKey = "bb0df6985c2eab6a171d64a6bacbb4e1";
//let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
//axios.get(apiUrl).then(showWeather);}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

// COME BACK TO let currentLocationButton = document.querySelector("#current-location-button");
//currentLocationButton.addEventListener("click", getCurrentLocation);

//week 5
//let apiKey = "7bdee33d3e5b4890be10f8b212e7a48d";

//let apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric";

searchCity("New York");
