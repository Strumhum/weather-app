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

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

// get city by user input - city search
function searchCity(city) {
  let weatherIconElement = document.querySelector("#main-icon");
  let units = "metric";
  let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

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

// display data for 6 day forecast and inject HTML for each day
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row forecast">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      let formattedDay = formatForecastDay(forecastDay.dt);
      let highTemp = Math.round(forecastDay.temp.max);
      let lowTemp = Math.round(forecastDay.temp.min);
      let dailyWeather = forecastDay.weather[0].main;
      let forecastIconClass = getForecastIconClass(dailyWeather);

      forecastHTML += `<div class="day col-sm-2">
          <div class="forecast-day">${formattedDay}</div>
          <i class="forecast-icon ${forecastIconClass}" alt="${dailyWeather}"></i>
          <p class="forecast-high-low">
            <span class="high-temp">${highTemp}°C</span>
            <span class="low-temp">${lowTemp}°C</span>
          </p>
        </div>`;
    }
  });

  forecastHTML += `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
// changing icon for each day dependent on data
function getForecastIconClass(dailyWeather) {
  if (dailyWeather === "Clear") {
    return "icon-wi_sunny";
  } else if (dailyWeather === "Clouds") {
    return "icon-wi_cloudy";
  } else if (dailyWeather === "Rain") {
    return "icon-wi_rain";
  } else if (dailyWeather === "Thunderstorm") {
    return "icon-wi_thunderstorm";
  } else if (dailyWeather === "Drizzle") {
    return "icon-wi_drizzle";
  } else if (dailyWeather === "Snow") {
    return "icon-wi_snowflake";
  } else if (
    dailyWeather === "Fog" ||
    dailyWeather === "Haze" ||
    dailyWeather === "Mist"
  ) {
    return "icon-wi_fog";
  } else if (dailyWeather === "Tornado") {
    return "icon-wi_tornado";
  } else {
    return "icon-wi_mostly-sunny"; // Return mostly sunny icon if the weather condition is not recognized
  }
}

// get forecast data via One Call API
function getForecast(coordinates) {
  let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

// display weather data on page for city
function displayWeather(response) {
  let temperatureElement = document.querySelector("#main-temp");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let currentWeatherElement = document.querySelector("#current-weather");
  let weatherIconElement = document.querySelector("#main-icon");
  let highTempElement = document.querySelector("#main-high-temp");
  let lowTempElement = document.querySelector("#main-low-temp");

  celsiusTemp = response.data.main.temp;

  // main high and low temps
  mainHighTemp = response.data.main.temp_max;
  mainLowTemp = response.data.main.temp_min;

  let currentWeather = response.data.weather[0].main;

  temperatureElement.innerHTML = Math.round(celsiusTemp) + "ºC";
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = "Humidity: " + response.data.main.humidity + "%";
  windElement.innerHTML =
    "Wind: " + Math.round(response.data.wind.speed) + " km/h";
  currentWeatherElement.innerHTML = currentWeather;
  highTempElement.innerHTML = "High " + Math.round(mainHighTemp) + "ºC";
  lowTempElement.innerHTML = "Low " + Math.round(mainLowTemp) + "ºC";

  getForecast(response.data.coord);

  // changing main weather icon by class
  weatherIconElement.className = "icon-wi_cloudy";

  if (currentWeather === "Clear") {
    weatherIconElement.className = "icon-wi_sunny";
  } else if (currentWeather === "Cloudy") {
    weatherIconElement.className = "icon-wi_cloudy";
  } else if (currentWeather === "Rain") {
    weatherIconElement.className = "icon-wi_rain";
  } else if (currentWeather === "Thunderstorm") {
    weatherIconElement.className = "icon-wi_thunderstorm";
  } else if (currentWeather === "Drizzle") {
    weatherIconElement.className = "icon-wi_drizzle";
  } else if (currentWeather === "Snow") {
    weatherIconElement.className = "icon-wi_snowflake";
  } else if (currentWeather === "Fog") {
    weatherIconElement.className = "icon-wi_fog";
  } else if (currentWeather === "Tornado") {
    weatherIconElement.className = "icon-wi_tornado";
  } else if (currentWeather === "Haze") {
    weatherIconElement.className = "icon-wi_fog";
  } else if (currentWeather === "Mist") {
    weatherIconElement.className = "icon-wi_fog";
  }
}

let celsiusTemp = null;
let highTemp = null;

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

searchCity("London");
