// favorites.js
// Handles rendering and managing APOD favorites view
import { getFromStorage } from './utils.js';

export function renderFavoritesView(container, onBack) {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  let favorites = getFromStorage('apodFavorites', []);
  if (user) {
    // Optionally, filter by user.email if you want per-user favorites
  }
  container.innerHTML = `
    <section id="favorites-section">
      <h2>⭐ Favorites</h2>
      <div id="favorites-list">
        ${favorites.length ? favorites.map(fav => `
          <div class="card favorite-card">
            <h4>${fav.title}</h4>
            <img src="${fav.url}" alt="Favorite APOD" />
            <button class="button remove-fav" data-url="${fav.url}">Remove</button>
          </div>
        `).join('') : '<p>No favorites yet.</p>'}
      </div>
      <button class="button" id="back-to-home">Back to Home</button>
    </section>
  `;
  document.getElementById('back-to-home').onclick = onBack;
  document.querySelectorAll('.remove-fav').forEach(btn => {
    btn.onclick = () => {
      favorites = favorites.filter(fav => fav.url !== btn.dataset.url);
      localStorage.setItem('apodFavorites', JSON.stringify(favorites));
      renderFavoritesView(container, onBack);
    };
  });
}
