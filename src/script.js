// display weather data on page for city
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML =
    Math.round(response.data.main.temp) + "ºC";
  document.querySelector("#humidity").innerHTML =
    "Humidity: " + response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + " mph";
  document.querySelector("#current-weather").innerHTML =
    response.data.weather[0].main;
}

// get city by user input - city search
function searchCity(city) {
  let units = "metric";
  let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  let cityInput = document.querySelector("#city-input");
  cityElement.innerHTML = cityInput.value;

  let city = cityInput.value;
  searchCity(city);
}

// get city by geolocation - coordinates
function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

// get current date and time
function showDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = "0".concat(hours);
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }
  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];
  return "".concat(day, " ").concat(hours, ":").concat(minutes);
}

// changing units of temperature by links
function tempToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = "20ºC";
}
function tempToFarenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = "68°F";
}

// city search engine
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// use current location button
let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);

// display current date and time
let dateElement = document.querySelector("#current-day-time");
let currentTime = new Date();
dateElement.innerHTML = showDate(currentTime);

// celsius and farenheit option
let celsiusUnit = document.querySelector("#celsius-link");
celsiusUnit.addEventListener("click", tempToCelsius);
let farenheitUnit = document.querySelector("#farenheit-link");
farenheitUnit.addEventListener("click", tempToFarenheit);
