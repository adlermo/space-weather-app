// home.js
// Handles loading and displaying the APOD on the Home page
import { fetchAPOD } from './apod-service.js';

document.addEventListener('DOMContentLoaded', async () => {
  const apodSection = document.getElementById('apod-section');

  apodSection.innerHTML = '<p>Loading...</p>';
  const apod = await fetchAPOD();
  if (apod) {
    apodSection.innerHTML = `
      <div class="card apod-card">
        <h2>${apod.title}</h2>
        <img src="${apod.url}" alt="Astronomy Picture of the Day" />
        <p>${apod.explanation}</p>
      </div>
    `;
  } else {
    apodSection.innerHTML = '<p>Could not load the Astronomy Picture of the Day.</p>';
  }
});
