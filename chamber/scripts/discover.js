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






    const visitMsg = document.getElementById("visit-message");
    const lastVisit = localStorage.getItem("lastVisit");
    const now = Date.now();

    if (!lastVisit) {
      visitMsg.textContent = "Welcome! Let us know if you have any questions.";
    } else {
      const diff = now - parseInt(lastVisit);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      if (days < 1) {
        visitMsg.textContent = "Back so soon! Awesome!";
      } else {
        visitMsg.textContent = `You last visited ${days} day${days === 1 ? "" : "s"} ago.`;
      }
    }
    localStorage.setItem("lastVisit", now);

    fetch("data/items.json")
      .then((res) => res.json())
      .then((items) => {
        const container = document.getElementById("card-container");
        items.forEach((item) => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <h2>${item.name}</h2>
            
              <img src="images/${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button>Learn More</button>
          `;
          container.appendChild(card);
        });
      });