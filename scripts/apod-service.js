// apod-service.js
// Fetches Astronomy Picture of the Day from NASA API

// Since we only have client-side code, this key is exposed.
const NASA_API_KEY = "MeCUQomCOM0NSXMG4wL3QsHbzJ2NEDGHO21SKFCQ";

const APOD_URL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`;

export async function fetchAPOD() {
  try {
    const response = await fetch(APOD_URL);
    if (!response.ok) throw new Error('Failed to fetch APOD');
    return await response.json();
  } catch (error) {
    console.error('APOD fetch error:', error);
    return null;
  }
}

export async function fetchAPODByDate(date) {
  try {
    const response = await fetch(`${APOD_URL}&date=${date}`);
    if (!response.ok) throw new Error('Failed to fetch APOD by date');
    return await response.json();
  } catch (error) {
    console.error('APOD fetch by date error:', error);
    return null;
  }
}