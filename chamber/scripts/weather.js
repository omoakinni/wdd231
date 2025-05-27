const currentWeather = document.querySelector("#current-weather");
//currentWeather.innerHTML = "<p>test</p>";
const forecast = document.querySelector("#forecast");


// Ensure latitude, longitude, myApiKey, and units are defined
const latitude = 9; // Example latitude
const longitude = 39; // Example longitude
const myApiKey = "a87f968813647290ca0c9952cbca4cef"; // Replace with your actual API key
const units = "metric"; // or "imperial" for Fahrenheit
const iconSize = "@2x.png"; // Size of the weather icon, can be "@2x.png" or "@4x.png"
const weatherIconURL = "https://openweathermap.org/img/wn/";

// Ensure the API key is valid and has permissions for the OpenWeatherMap API
if (!myApiKey) {
  console.error("API key is not defined. Please set your OpenWeatherMap API key.");
}


const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${myApiKey}&units=${units}`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${myApiKey}&units=${units}`;
async function getWeather() {
  try {
    const response = await fetch(weatherURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayCurrentWeather(data);
  } catch (error) {
    console.error("Error fetching current weather:", error);
  }
}
async function getForecast() {
  try {
    const response = await fetch(forecastURL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    displayForecast(data);
  } catch (error) {
    console.error("Error fetching forecast:", error);
  }
}
function displayCurrentWeather(data) {
  const { main, weather, wind } = data;
  const temperature = Math.round(main.temp);
  const humidity = main.humidity;
  const windSpeed = Math.round(wind.speed);
  const description = weather[0].description;
  const iconCode = data.weather[0].icon;
    //const icon = iconCode ? iconCode : "01d"; // Default to clear sky icon if no icon code is available
    // Construct the icon URL using the icon code

  const iconURL = `${weatherIconURL}${iconCode}${iconSize}`;
  // Update the current weather section with the fetched data


  currentWeather.innerHTML = `
    <div class="current-weather-item">
        
        <p>Temperature: ${temperature}°</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Description: ${description}</p>
    </div>
    <div class="current-weather-icon">
        <img src="${iconURL}" alt="${description}">
    </div>

  `;
}
function displayForecast(data) {
  const forecastList = data.list.slice(0, 5); // Get the first 5 forecast entries
  let forecastHTML = "";

  forecastList.forEach(entry => {
    const date = new Date(entry.dt * 1000);
    const temperature = Math.round(entry.main.temp);
    const description = entry.weather[0].description;

    forecastHTML += `
      <div class="forecast-item">
        <p>${date.toLocaleDateString()} - ${date.toLocaleTimeString()}</p>
        <p>${temperature}°</p>
        <p>${description}</p>
      </div>
    `;
  });

  forecast.innerHTML = forecastHTML;
}
getWeather();
getForecast();
// Ensure the script runs after the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  getWeather();
  getForecast();
});
