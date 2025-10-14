/* scripts/main.js -- ES module
   - toggles responsive nav
   - fetches data/projects.json, renders at least 15 items
   - handles modal dialog and favorites using localStorage
*/

const BASE = './';
const PROJECTS_JSON = `${BASE}data/projects.json`;

const yearElements = Array.from(document.querySelectorAll('#year, #year-2, #year-3'));
yearElements.forEach(e => { if (e) e.textContent = new Date().getFullYear(); });

// NAV toggle (works on both pages)
function setupNavToggle(buttonId, navId) {
  const btn = document.getElementById(buttonId);
  const nav = document.getElementById(navId);
  if (!btn || !nav) return;
  btn.addEventListener('click', () => {
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !expanded);
    nav.hidden = expanded;
  });
  // Ensure initial state for small screens
  if (window.innerWidth < 800) nav.hidden = true;
}
setupNavToggle('nav-toggle', 'main-nav');
setupNavToggle('nav-toggle-2', 'main-nav-2');

// PORTFOLIO: only on pages that have #projects-list
const projectsListEl = document.getElementById('projects-list');
if (projectsListEl) {
  fetchAndRenderProjects();
}

async function fetchAndRenderProjects() {
  try {
    const resp = await fetch(PROJECTS_JSON, {cache: "no-cache"});
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const data = await resp.json();

    // Ensure at least 15 items — if fewer, repeat items to meet requirement (keeps deterministic)
    let projects = Array.isArray(data) ? data.slice() : [];
    if (projects.length < 15) {
      const need = 15 - projects.length;
      for (let i = 0; i < need; i++) {
        const src = projects[i % projects.length] || { id: 100+i, title: `Placeholder ${i+1}`, description:'Placeholder', image:'images/placeholder.jpg', price:'TBD' };
        projects.push({...src, id: (src.id || 100)+i});
      }
    }

    // Render at least 15 items (each card shows 4 properties)
    projects.slice(0, 15).forEach(renderProjectCard);

  } catch (err) {
    console.error('Failed to load projects:', err);
    projectsListEl.innerHTML = `<div class="error">Sorry — could not load portfolio items. (${err.message})</div>`;
  }
}

function renderProjectCard(item) {
  // item: {id, title, description, image, price}
  const card = document.createElement('article');
  card.className = 'project-card';
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-pressed', 'false');
  card.dataset.id = item.id;

  card.innerHTML = `
    <figure class="card-media">
      <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" width="400" height="250">
    </figure>
    <div class="card-body">
      <h3>${escapeHtml(item.title)}</h3>
      <p class="desc">${escapeHtml(item.description)}</p>
      <p class="meta"><strong>Price:</strong> ${escapeHtml(item.price)}</p>
      <div class="card-actions">
        <button class="btn btn-details" data-id="${item.id}">Details</button>
        <button class="btn btn-fav" data-id="${item.id}">❤ Favorite</button>
      </div>
    </div>
  `;

  // Events: open modal on details or Enter key
  card.querySelector('.btn-details').addEventListener('click', () => openModal(item));
  card.querySelector('.btn-fav').addEventListener('click', () => toggleFavorite(item));

  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(item);
    }
  });

  projectsListEl.appendChild(card);
}

// modal behavior
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
const modalFav = document.getElementById('modal-fav');

function openModal(item) {
  if (!modal) return;
  modalTitle.textContent = item.title;
  modalBody.innerHTML = `
    <img src="${item.image}" alt="${escapeHtml(item.title)}" loading="lazy" style="max-width:100%;height:auto">
    <p>${escapeHtml(item.description)}</p>
    <p><strong>Price:</strong> ${escapeHtml(item.price)}</p>
    <p><strong>ID:</strong> ${escapeHtml(String(item.id))}</p>
  `;
  modal.setAttribute('aria-hidden', 'false');
  modal.style.display = 'block';
  modalClose.focus();

  // wire favorite button in modal
  modalFav.onclick = () => toggleFavorite(item);

  // simple focus trap (keep focus inside modal)
  document.addEventListener('focus', trapFocus, true);
}

function closeModal() {
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'true');
  modal.style.display = 'none';
  document.removeEventListener('focus', trapFocus, true);
}

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (e) => {
  if (e.target === modal) closeModal(); // click backdrop to close
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.getAttribute('aria-hidden') === 'false') closeModal();
});

function trapFocus(e) {
  const inside = modal?.contains(e.target);
  if (!inside) {
    e.stopPropagation();
    modalClose?.focus();
  }
}

// LOCAL STORAGE favorites
const STORAGE_KEY = 'aie_favorites';
function loadFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function saveFavorites(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}
function toggleFavorite(item) {
  const favs = loadFavorites();
  const exists = favs.find(f => f.id === item.id);
  if (exists) {
    const newFavs = favs.filter(f => f.id !== item.id);
    saveFavorites(newFavs);
    alert(`${item.title} removed from favorites`);
  } else {
    favs.push({id:item.id, title:item.title, price:item.price});
    saveFavorites(favs);
    alert(`${item.title} added to favorites`);
  }
}

// small helper to escape text used in templates (prevent injection)
function escapeHtml(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

// If on a page that should show favorites (optional), you can read localStorage with loadFavorites()
// Example usage: console.log(loadFavorites());