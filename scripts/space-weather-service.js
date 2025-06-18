// space-weather-service.js
// Fetches real-time space weather data from NASA DONKI API

const NASA_API_KEY = 'MeCUQomCOM0NSXMG4wL3QsHbzJ2NEDGHO21SKFCQ'; // Replace with your own API key for production
const BASE_URL = 'https://api.nasa.gov/DONKI';

export async function fetchSolarWind(startDate, endDate) {
  const url = `${BASE_URL}/CME?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch CME data');
    return await response.json();
  } catch (error) {
    console.error('CME fetch error:', error);
    return [];
  }
}

export async function fetchRadiation(startDate, endDate) {
  const url = `${BASE_URL}/SEP?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch SEP data');
    return await response.json();
  } catch (error) {
    console.error('SEP fetch error:', error);
    return [];
  }
}

export async function fetchGeomagneticStorms(startDate, endDate) {
  const url = `${BASE_URL}/GST?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch GST data');
    return await response.json();
  } catch (error) {
    console.error('GST fetch error:', error);
    return [];
  }
}

export async function fetchSolarFlares(startDate, endDate) {
  const url = `${BASE_URL}/FLR?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch FLR data');
    return await response.json();
  } catch (error) {
    console.error('FLR fetch error:', error);
    return [];
  }
}

export async function fetchMagnetopauseCrossings(startDate, endDate) {
  const url = `${BASE_URL}/MPC?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch MPC data');
    return await response.json();
  } catch (error) {
    console.error('MPC fetch error:', error);
    return [];
  }
}

export async function fetchRadiationBeltEnhancements(startDate, endDate) {
  const url = `${BASE_URL}/RBE?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch RBE data');
    return await response.json();
  } catch (error) {
    console.error('RBE fetch error:', error);
    return [];
  }
}

export async function fetchHighSpeedStreams(startDate, endDate) {
  const url = `${BASE_URL}/HSS?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch HSS data');
    return await response.json();
  } catch (error) {
    console.error('HSS fetch error:', error);
    return [];
  }
}

export async function fetchWSAEnlilSimulations(startDate, endDate) {
  const url = `${BASE_URL}/WSAEnlilSimulations?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch WSAEnlilSimulations data');
    return await response.json();
  } catch (error) {
    console.error('WSAEnlilSimulations fetch error:', error);
    return [];
  }
}

export async function fetchNotifications(startDate, endDate) {
  const url = `${BASE_URL}/notifications?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch notifications');
    return await response.json();
  } catch (error) {
    console.error('Notifications fetch error:', error);
    return [];
  }
}

export async function fetchInterplanetaryShocks(startDate, endDate) {
  const url = `${BASE_URL}/IPS?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch IPS data');
    return await response.json();
  } catch (error) {
    console.error('IPS fetch error:', error);
    return [];
  }
}

export async function fetchStreamInteractionRegions(startDate, endDate) {
  const url = `${BASE_URL}/SIR?startDate=${startDate}&endDate=${endDate}&api_key=${NASA_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch SIR data');
    return await response.json();
  } catch (error) {
    console.error('SIR fetch error:', error);
    return [];
  }
}

export function weatherDashboardTemplate({
  cmes, seps, storms, flares, mpcs, rbes, hsss, wsa, notifs, ips
}) {
  return `
    <div class="dashboard-flex">
      <div class="card weather-card" data-tooltip="Coronal Mass Ejections: Large expulsions of plasma and magnetic field from the Sun's corona."><h3>CMEs</h3><p>${cmes.length ? cmes.length + ' event(s) in range.' : 'No events in range.'}</p></div>
      <div class="card weather-card" data-tooltip="Solar Energetic Particles: High-energy particles emitted by the Sun, often during solar flares or CMEs."><h3>SEPs</h3><p>${seps.length ? seps.length + ' event(s) in range.' : 'No events in range.'}</p></div>
      <div class="card weather-card" data-tooltip="Geomagnetic Storms: Disturbances in Earth’s magnetic field caused by solar wind and space weather events."><h3>Geomagnetic Storms</h3><p>${storms.length ? storms.length + ' event(s) in range.' : 'No events in range.'}</p></div>
      <div class="card weather-card" data-tooltip="Solar Flares: Sudden flashes of increased brightness on the Sun, often associated with energy release."><h3>Solar Flares</h3><p>${flares.length ? flares.length + ' event(s) in range.' : 'No events in range.'}</p></div>
      <div class="card weather-card" data-tooltip="Magnetopause Crossings: Events where satellites cross the boundary between Earth's magnetosphere and solar wind."><h3>Magnetopause Crossings</h3><p>${mpcs.length ? mpcs.length + ' event(s) in range.' : 'No events in range.'}</p></div>
      <div class="card weather-card" data-tooltip="Radiation Belt Enhancements: Increases in radiation within Earth's Van Allen belts, often due to geomagnetic storms."><h3>Radiation Belt Enhancements</h3><p>${rbes.length ? rbes.length + ' event(s) in range.' : 'No events in range.'}</p></div>
      <div class="card weather-card" data-tooltip="High Speed Streams: Fast-moving solar wind streams that can interact with Earth's magnetosphere."><h3>High Speed Streams</h3><p>${hsss.length ? hsss.length + ' event(s) in range.' : 'No events in range.'}</p></div>
      <div class="card weather-card" data-tooltip="WSA-Enlil Simulations: Model simulations predicting solar wind and CME propagation in the heliosphere."><h3>WSA-Enlil Simulations</h3><p>${wsa.length ? wsa.length + ' result(s) in range.' : 'No results in range.'}</p></div>
      <div class="card weather-card" data-tooltip="Notifications: Official NASA notifications about significant space weather events."><h3>Notifications</h3><p>${notifs.length ? notifs.length + ' notification(s) in range.' : 'No notifications in range.'}</p></div>
      <div class="card weather-card" data-tooltip="Interplanetary Shocks: Shock waves in the solar wind, often caused by CMEs or high speed streams."><h3>Interplanetary Shocks</h3><p>${ips.length ? ips.length + ' event(s) in range.' : 'No events in range.'}</p></div>
    </div>
  `;
}
