
// --- Function to format the date and time ---
function formatData(timestamp) {
 let date = new Date(timestamp * 1000); 

 let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
 let dayOfWeek = days[date.getDay()];
 
 let hours = date.getHours();
 let minutes = date.getMinutes();
 
 if (minutes < 10) {
 minutes = `0${minutes}`;
 }

 // Use the day of the week for display
 return `${dayOfWeek} ${hours}:${minutes}`;
}


// --- Function to update the weather display with API response ---
function refreshWeather(response) {
  // OpenWeatherMap API provides data structure in response.data
  let data = response.data;
  
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let iconElement = document.querySelector("#icon");


  // **API paths for temperature, humidity, description, and icon**
  
  // Temperature (under 'main' object)
  let temperature = data.main.temp; 
  temperatureElement.innerHTML = Math.round(temperature);
  
  // City Name
  cityElement.innerHTML = data.name;

  // Description (under 'weather' array, first item)
  descriptionElement.innerHTML = data.weather[0].description;
  
  // Humidity (under 'main' object)
  humidityElement.innerHTML = `${data.main.humidity}%`; 
  
  // Wind Speed (under 'wind' object)
  windSpeedElement.innerHTML = `${data.wind.speed}m/s`; 
  timeElement.innerHTML = formatData(data.dt);
  

  // Icon (needs to be constructed using the icon code from 'weather' array)
  let iconCode = data.weather[0].icon;
  iconElement.innerHTML = ` <img src="http://openweathermap.org/img/wn/${iconCode}@2x.png" class="weather-app-icon">`;
}


// --- Function to call the OpenWeatherMap API ---
function searchCity(city) {
  // Note: Your API key is visible here. In a real app, this should be secured.
  let apiKey = "d4d46bbf69e026814e12986d4ca2fa70"; 
  // Requesting 'metric' units gives temperature in Celsius.
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(refreshWeather);
}


// --- Event handler for the search form submission ---
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

// --- Initial setup and function calls ---
let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

// Initial search when the app loads
searchCity("Lisbon");

