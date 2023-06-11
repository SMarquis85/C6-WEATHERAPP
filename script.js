document.getElementById("weatherForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  var locationInput = document.getElementById("locationInput").value;
  getWeather(locationInput);
});

function getWeather(location) {
  var apiKey = '55a621c514a6bcf2dde6b6f72b563167';
  var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&appid=' + apiKey;

  fetch(apiUrl)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      updateCurrentWeatherInfo(data);
      displayForecast(data);
      addSearchToHistory(location);
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
}

function updateCurrentWeatherInfo(data) {
  var locationElement = document.getElementById("location");
  var dateElement = document.getElementById("date");
  var iconElement = document.getElementById("icon");
  var temperatureElement = document.getElementById("temperature");
  var humidityElement = document.getElementById("humidity");
  var windElement = document.getElementById("wind");

  locationElement.textContent = 'Location: ' + data.city.name;
  dateElement.textContent = 'Date: ' + getCurrentDate();
  iconElement.innerHTML = '<img src="http://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '.png" alt="Weather Icon">';
  temperatureElement.textContent = 'Temperature: ' + convertKelvinToCelsius(data.list[0].main.temp) + '°C';
  humidityElement.textContent = 'Humidity: ' + data.list[0].main.humidity + '%';
  windElement.textContent = 'Wind Speed: ' + data.list[0].wind.speed + ' m/s';
}

function displayForecast(data) {
  var forecastContainer = document.getElementById("forecastContainer");
  forecastContainer.innerHTML = ''; // Clear previous content

  for (var i = 0; i < 5; i++) {
    var forecast = data.list[i * 8]; // Retrieve data for every 24 hours

    var forecastItem = document.createElement("div");
    forecastItem.classList.add("forecast-item");

    var dateElement = document.createElement("p");
    dateElement.textContent = formatDate(forecast.dt);
    forecastItem.appendChild(dateElement);

    var iconElement = document.createElement("img");
    iconElement.src = 'http://openweathermap.org/img/wn/' + forecast.weather[0].icon + '.png';
    iconElement.alt = "Weather Icon";
    forecastItem.appendChild(iconElement);

    var temperatureElement = document.createElement("p");
    temperatureElement.textContent = 'Temperature: ' + convertKelvinToCelsius(forecast.main.temp) + '°C';
    forecastItem.appendChild(temperatureElement);

    var humidityElement = document.createElement("p");
    humidityElement.textContent = 'Humidity: ' + forecast.main.humidity + '%';
    forecastItem.appendChild(humidityElement);

    var windElement = document.createElement("p");
    windElement.textContent = 'Wind Speed: ' + forecast.wind.speed + ' m/s';
    forecastItem.appendChild(windElement);

    forecastContainer.appendChild(forecastItem);
  }
}

function convertKelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function addSearchToHistory(location) {
  var historyList = document.getElementById("historyList");

  // Create a new list item for the current search item
  var listItem = document.createElement("li");
  listItem.textContent = location;

  // Insert the new search history item before the location input
  var locationInput = document.getElementById("locationInput");
  historyList.insertBefore(listItem, locationInput);
}

function getCurrentDate() {
  var date = new Date();
  return date.toDateString();
}

function formatDate(timestamp) {
  var date = new Date(timestamp * 1000);
  return date.toDateString();
}
