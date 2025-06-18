// home.js
// Handles loading and displaying the APOD on the Home page
import { fetchAPOD, fetchAPODByDate, apodCardTemplate } from './apod-service.js';
import {
  fetchSolarWind,
  fetchRadiation,
  fetchGeomagneticStorms,
  fetchSolarFlares,
  fetchMagnetopauseCrossings,
  fetchRadiationBeltEnhancements,
  fetchHighSpeedStreams,
  fetchWSAEnlilSimulations,
  fetchNotifications,
  fetchInterplanetaryShocks,
  weatherDashboardTemplate
} from './space-weather-service.js';
import { registerUser, loginUser, logoutUser, getCurrentUser } from './user-auth.js';
import { renderFavoritesView } from './favorites.js';
import { copyToClipboard, getShareUrl } from './utils.js';

document.addEventListener('DOMContentLoaded', () => {
  // User Account UI
  const userSection = document.getElementById('user-account-section');
  let showLogin = true;
  renderUserUI();

  function renderUserUI() {
    const user = getCurrentUser();
    if (user) {
      userSection.innerHTML = `
        <span>Welcome, ${user.email}!</span>
        <button class="button" id="logout-btn">Logout</button>
      `;
      document.getElementById('logout-btn').onclick = () => {
        logoutUser();
        renderUserUI();
      };
    } else {
      if (showLogin) {
        userSection.innerHTML = `
          <form id="login-form">
            <input type="email" id="login-email" placeholder="Email" required />
            <input type="password" id="login-password" placeholder="Password" required />
            <button class="button" type="submit">Login</button>
          </form>
          <br>
          <span>
            <a href="#" id="show-register">Don't have an account? Register</a>
          </span>
        `;
        document.getElementById('login-form').onsubmit = e => {
          e.preventDefault();
          const email = document.getElementById('login-email').value;
          const password = document.getElementById('login-password').value;
          const result = loginUser(email, password);
          if (result.success) {
            renderUserUI();
          } else {
            alert(result.message);
          }
        };

        document.getElementById('show-register').onclick = e => {
          e.preventDefault();
          showLogin = false;
          renderUserUI();
        };
      } else {
        userSection.innerHTML = `
          <form id="register-form" style="display:inline-block;">
            <input type="email" id="register-email" placeholder="Email" required />
            <input type="password" id="register-password" placeholder="Password" required />
            <button class="button" type="submit">Register</button>
          </form>
          <br>
          <span>
            <a href="#" id="show-login">Already have an account? Login</a>
          </span>
        `;
        document.getElementById('register-form').onsubmit = e => {
          e.preventDefault();
          const email = document.getElementById('register-email').value;
          const password = document.getElementById('register-password').value;
          const result = registerUser(email, password);
          if (result.success) {
            alert('Registration successful! You can now log in.');
            showLogin = true;
            renderUserUI();
          } else {
            alert(result.message);
          }
        };
        document.getElementById('show-login').onclick = e => {
          e.preventDefault();
          showLogin = true;
          renderUserUI();
        };
      }
    }
  }

  // Tooltip delay logic for weather cards
  let tooltipTimer;
  document.body.addEventListener('mouseover', function (e) {
    const card = e.target.closest('.weather-card[data-tooltip]');
    if (card) {
      tooltipTimer = setTimeout(() => {
        card.classList.add('show-tooltip');
      }, 1000); // 1 second delay
    }
  });
  document.body.addEventListener('mouseout', function (e) {
    const card = e.target.closest('.weather-card[data-tooltip]');
    if (card) {
      clearTimeout(tooltipTimer);
      card.classList.remove('show-tooltip');
    }
  });

  // Favorites/Home toggle logic
  const showFavBtn = document.getElementById('show-favorites');
  const showHomeBtn = document.getElementById('show-home');
  const main = document.querySelector('main');
  const dateRangeFilter = document.getElementById('date-range-filter');
  let homeContent = main.innerHTML;

  showFavBtn.onclick = () => {
    homeContent = main.innerHTML;
    renderFavoritesView(main, () => {
      main.innerHTML = homeContent;
      showFavBtn.style.display = '';
      showHomeBtn.style.display = 'none';
      dateRangeFilter.style.display = '';
    });
    showFavBtn.style.display = 'none';
    showHomeBtn.style.display = '';
    dateRangeFilter.style.display = 'none';
  };
  showHomeBtn.onclick = () => {
    main.innerHTML = homeContent;
    showFavBtn.style.display = '';
    showHomeBtn.style.display = 'none';
    dateRangeFilter.style.display = '';
  };

  // Theme toggle logic
  const themeBtn = document.getElementById('toggle-theme');
  const root = document.documentElement;
  const THEME_KEY = 'spaceWeatherTheme';

  function setTheme(theme) {
    if (theme === 'light') {
      root.classList.add('light-theme');
      localStorage.setItem(THEME_KEY, 'light');
    } else {
      root.classList.remove('light-theme');
      localStorage.setItem(THEME_KEY, 'dark');
    }
  }

  // Initial theme
  const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
  setTheme(savedTheme);

  themeBtn.onclick = () => {
    const current = localStorage.getItem(THEME_KEY) || 'dark';
    setTheme(current === 'dark' ? 'light' : 'dark');
  };
});

// Date range filter logic
const startInput = document.getElementById('start-date');
const endInput = document.getElementById('end-date');

// Set default range: today
const today = new Date().toISOString().slice(0, 10);
startInput.value = today;
endInput.value = today;
startInput.max = today;
endInput.max = today;

async function updateDashboardAndAPOD() {
  const startDate = startInput.value;
  const endDate = endInput.value;
  if (!startDate || !endDate) return;
  // APOD: use first date, fallback to today if in the future
  let apodDate = startDate;
  const todayStr = new Date().toISOString().slice(0, 10);
  if (apodDate > todayStr) apodDate = todayStr;
  const apodSection = document.getElementById('apod-section');
  apodSection.innerHTML = '<p>Loading...</p>';
  const apod = await fetchAPODByDate(apodDate);
  if (apod) {
    apodSection.innerHTML = apodCardTemplate(apod);
    document.getElementById('save-favorite').addEventListener('click', () => {
      saveFavorite(apod);
    });
  } else {
    apodSection.innerHTML = '<p>Could not load the Astronomy Picture of the Day.</p>';
  }

  // Dashboard
  const dashboard = document.getElementById('space-weather-dashboard');
  dashboard.innerHTML = '<p>Loading space weather data...</p>';
  const [
    cmes, seps, storms, flares, mpcs, rbes, hsss, wsa, notifs, ips
  ] = await Promise.all([
    fetchSolarWind(startDate, endDate),
    fetchRadiation(startDate, endDate),
    fetchGeomagneticStorms(startDate, endDate),
    fetchSolarFlares(startDate, endDate),
    fetchMagnetopauseCrossings(startDate, endDate),
    fetchRadiationBeltEnhancements(startDate, endDate),
    fetchHighSpeedStreams(startDate, endDate),
    fetchWSAEnlilSimulations(startDate, endDate),
    fetchNotifications(startDate, endDate),
    fetchInterplanetaryShocks(startDate, endDate)
  ]);
  dashboard.innerHTML = weatherDashboardTemplate({
    cmes, seps, storms, flares, mpcs, rbes, hsss, wsa, notifs, ips
  }) + `
    <div style="text-align:center;margin:2em 0;">
      <button class="button" id="share-dashboard">🔗 Share Dashboard</button>
    </div>
  `;
  document.getElementById('share-dashboard').addEventListener('click', () => {
    const url = getShareUrl('dashboard', { start: startDate, end: endDate });
    copyToClipboard(url);
    alert('Dashboard link copied to clipboard!');
  });
}


const applyBtn = document.getElementById('apply-date-range');

applyBtn.addEventListener('click', updateDashboardAndAPOD);
// Initial load only if dates are set
if (startInput.value && endInput.value) {
  updateDashboardAndAPOD();
}

// Add favorites logic
function saveFavorite(apod) {
  let favorites = JSON.parse(localStorage.getItem('apodFavorites')) || [];
  // Avoid duplicates by URL
  if (!favorites.some(fav => fav.url === apod.url)) {
    favorites.push({
      title: apod.title,
      url: apod.url,
      explanation: apod.explanation,
      date: apod.date
    });
    localStorage.setItem('apodFavorites', JSON.stringify(favorites));
    alert('Saved to favorites!');
  } else {
    alert('Already in favorites!');
  }
}
