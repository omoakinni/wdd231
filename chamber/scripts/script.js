// script.js
const menuItem = document.querySelector("#menu");
const navElement = document.querySelector("#animated-menu");

// Toggle navigation menu on mobile
menuItem.addEventListener("click", () => {
    //navElement.classList.toggle("responsive");
    navElement.classList.toggle("open");
    menuItem.classList.toggle("open");

});
// Close navigation menu when a link is clicked
/*const navLinks = document.querySelectorAll(".navigation a");
navLinks.forEach(link => {  
    link.addEventListener("click", () => {
        navElement.classList.remove("responsive");
    });
});
// Update the year and last modified date
const yearSpan = document.querySelector("#year");
const lastModifiedSpan = document.querySelector("#lastModified");
yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;
// Toggle between grid and list view for members    
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");
const membersContainer = document.querySelector("#members-container");
gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
});
listBtn.addEventListener("click", () => {   
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
});
*/
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  const lastModifiedSpan = document.getElementById("lastModified");
  const membersContainer = document.getElementById("members-container");
  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");

  // Update year and last modified
  yearSpan.textContent = new Date().getFullYear();
  lastModifiedSpan.textContent = document.lastModified;

  // Toggle view
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
  });

  // Load members from JSON
  async function loadMembers() {
    try {
      const response = await fetch("scripts/members.json");
      const members = await response.json();

      membersContainer.innerHTML = members.map(member => `
        <div class="member-card level-${member.membership}">
          <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" width="34" height="40" />
          <h3>${member.name}</h3>
          <p>${member.description}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        </div>
      `).join("");
    } catch (error) {
      membersContainer.innerHTML = "<p>Failed to load members.</p>";
      console.error("Error loading members:", error);
    }
  }

  loadMembers();
});
// Responsive design for mobile

/*

<script>
  // JavaScript to handle the directory view toggle
  document.addEventListener('DOMContentLoaded', () => {
    const membersContainer = document.getElementById('members-container');
    const gridViewButton = document.getElementById('grid-view');
    const listViewButton = document.getElementById('list-view');

    // Sample data for demonstration
    const members = [
      { name: 'Business One', description: 'Description of Business One', image: 'images/business1.jpg' },
      { name: 'Business Two', description: 'Description of Business Two', image: 'images/business2.jpg' },
      { name: 'Business Three', description: 'Description of Business Three', image: 'images/business3.jpg' },
      // Add more members as needed
    ];

    function renderMembers(view) {
      membersContainer.innerHTML = '';
      members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = view === 'grid' ? 'member-card grid-item' : 'member-card list-item';
        memberCard.innerHTML = `
          <img src="${member.image}" alt="${member.name}" />
          <h3>${member.name}</h3>
          <p>${member.description}</p>
        `;
        membersContainer.appendChild(memberCard);
      });
    }

    gridViewButton.addEventListener('click', () => {
      membersContainer.className = 'grid-view';
      renderMembers('grid');
    });

    listViewButton.addEventListener('click', () => {
      membersContainer.className = 'list-view';
      renderMembers('list');
    });

    // Initialize with grid view
    renderMembers('grid');

    // Set current year and last modified date
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
  });

*/
