// user-auth.js
// Simple localStorage-based registration and login system
import { hash, getFromStorage, setToStorage } from './utils.js';

export function registerUser(email, password) {
  let users = getFromStorage('users', []);
  if (users.some(u => u.email === email)) {
    return { success: false, message: 'Email already registered.' };
  }
  users.push({ email, password: hash(password) });
  setToStorage('users', users);
  return { success: true };
}

export function loginUser(email, password) {
  let users = getFromStorage('users', []);
  const user = users.find(u => u.email === email && u.password === hash(password));
  if (user) {
    setToStorage('currentUser', { email });
    return { success: true };
  }
  return { success: false, message: 'Invalid credentials.' };
}

export function logoutUser() {
  localStorage.removeItem('currentUser');
}

export function getCurrentUser() {
  return getFromStorage('currentUser');
}
