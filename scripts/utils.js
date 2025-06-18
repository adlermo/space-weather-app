// utils.js
// Shared utility functions for the Space Weather App

// Simple hash for demonstration (not secure for real apps)
export function hash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

// Get and set JSON in localStorage
export function getFromStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function setToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
