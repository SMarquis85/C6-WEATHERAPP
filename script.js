document.getElementById("weatherForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
  
    var locationInput = document.getElementById("locationInput").value;
    getWeather(locationInput);
  });
  
  function getWeather(location) {
    var apiKey = 'YOUR_API_KEY';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + apiKey;
  
    fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        updateWeatherInfo(data);
        addSearchToHistory(location);
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
  }
  
  function updateWeatherInfo(data) {
    var temperatureElement = document.getElementById("temperature");
    var humidityElement = document.getElementById("humidity");
    var descriptionElement = document.getElementById("description");
  
    temperatureElement.textContent = 'Temperature: ' + data.main.temp + '°C';
    humidityElement.textContent = 'Humidity: ' + data.main.humidity + '%';
    descriptionElement.textContent = 'Description: ' + data.weather[0].description;
  }
  
  function addSearchToHistory(location) {
    var historyList = document.getElementById("historyList");
    var listItem = document.createElement("li");
    listItem.textContent = location;
    historyList.appendChild(listItem);
  }