document.getElementById("year").textContent = new Date().getFullYear();
const menuItem = document.querySelector("#menu");
const navElement = document.querySelector("#animated-menu");

// Toggle navigation menu on mobile
menuItem.addEventListener("click", () => {
    //navElement.classList.toggle("responsive");
    navElement.classList.toggle("open");
    menuItem.classList.toggle("open");

});

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  const lastModifiedSpan = document.getElementById("lastModified");
  

  // Update year and last modified
  yearSpan.textContent = new Date().getFullYear();
  lastModifiedSpan.textContent = document.lastModified;


});


// Weather Section (OpenWeatherMap API)
/*const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?q=Addis%20Ababa,ET&units=metric&appid=${apiKey}`;

async function fetchWeather() {
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();

    const current = data.list[0];
    document.getElementById('current-weather').innerHTML = `
      <p><strong>Now:</strong> ${current.main.temp}°C - ${current.weather[0].description}</p>
    `;

    const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(1, 4);
    const forecastHTML = forecast.map(item => {
      const date = new Date(item.dt_txt).toLocaleDateString(undefined, { weekday: 'short' });
      return `<p><strong>${date}:</strong> ${item.main.temp}°C, ${item.weather[0].main}</p>`;
    }).join('');
    document.getElementById('forecast').innerHTML = forecastHTML;

  } catch (err) {
    document.getElementById('weather').innerHTML += `<p>Weather unavailable.</p>`;
  }
}

fetchWeather();*/

// Spotlight Members
async function loadSpotlights() {
  const res = await fetch('scripts/members.json');
  if (!res.ok) {
    console.error('Failed to fetch members data:', res.statusText);
    return;
  }
  const data = await res.json();
  const eligible = data.filter(m => m.membership === 2 || m.membership === 3);
  const selected = eligible.sort(() => 0.5 - Math.random()).slice(0, 3);

  const html = selected.map(m => `
    <div class="spotlight-card level-${m.membership}">
      
      <img src="images/${m.image}" alt="${m.name} logo" loading="lazy" width="40" height="40" />

      <h3>${m.name}</h3>
      <p>${m.address}</p>
      <p>${m.phone}</p>
      <a href="${m.website}" target="_blank">${m.website}</a>
      <p class="membership ${m.membership === 3 ? 'gold' : 'silver'}">${m.membership === 3 ? 'Gold' : 'Silver'} Member</p>
    </div>
  `).join('');
  document.getElementById('spotlight-container').innerHTML = html;
}

loadSpotlights();