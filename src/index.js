//forecast//

function getForecast(coordinates) {
  let apiKey = "b430aa6ae36d08fafac8e3f756c531a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(".forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col">
          <div class="forecast-date"> ${formatDay(forecastDay.dt)}</div>
          <div class="forecast-temp">
            H:
            <span class="forcast-tempmax"> ${Math.round(
              forecastDay.temp.max
            )}°</span>| L:
            <span class="forecast-temp-min"> ${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"/> 
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//current weather/ /
function showCurrentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let conditions = response.data.weather[0].main;
  let currentTemp = document.querySelector("#temp");
  let windElement = document.querySelector("#wind");
  let currentCond = document.querySelector("#conditions");
  let iconElement = document.querySelector("#icon");
  let maxElement = document.querySelector("#max");
  let minElement = document.querySelector("#min");
  maxElement.innerHTML = Math.round(response.data.main.temp_max);
  minElement.innerHTML = Math.round(response.data.main.temp_min);
  currentTemp.innerHTML = ` ${temperature} `;
  currentCond.innerHTML = `${conditions}`;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let city = document.querySelector("#search-city").value;

  h1.innerHTML = `${city}`;
  let apiKey = "b430aa6ae36d08fafac8e3f756c531a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&apiid=${apiKey}`).then(showCurrentWeather);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

//current location//
function showPosition(position) {
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;
  let units = "metric";
  let apiKey = "b430aa6ae36d08fafac8e3f756c531a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-location");
currentButton.addEventListener("click", getCurrentLocation);

//current date//
let now = new Date();
let currentDate = document.querySelector("h3");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let date = now.getDate();
let year = now.getFullYear();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

currentDate.innerHTML = `${month}, ${day} ${year} ${hours}:${minutes}`;
