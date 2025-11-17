function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#weather-app-city");

  let temperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(temperature);
  cityElement.innerHTML = response.data.name;
}

function searchCity(city) {
  let apiKey = "d4d46bbf69e026814e12986d4ca2fa70"; 
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");

