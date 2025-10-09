// Track page visits and display message
function displayVisitMessage() {
  const visitMessage = document.getElementById('visit-message');
  const lastVisit = localStorage.getItem('lastVisit');
  const currentTime = Date.now();
  
  if (!lastVisit) {
    // First visit
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const timeDiff = currentTime - parseInt(lastVisit);
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    if (daysDiff < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else {
      const dayText = daysDiff === 1 ? "day" : "days";
      visitMessage.textContent = `You last visited ${daysDiff} ${dayText} ago.`;
    }
  }
  
  // Store current visit time
  localStorage.setItem('lastVisit', currentTime.toString());
}

// Load places data and create cards
function loadPlaces() {
  fetch('data/places.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('card-container');
      
      data.places.forEach(place => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
          <h2>${place.name}</h2>
          <figure>
            <img src="${place.image}" alt="${place.name}" width="300" height="200" loading="lazy">
          </figure>
          <address>${place.address}</address>
          <p>${place.description}</p>
          <button>Learn More</button>
        `;
        
        container.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error loading places data:', error);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
  displayVisitMessage();
  loadPlaces();
  
  // Update year and last modified date in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = document.lastModified;
});