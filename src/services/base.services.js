import jwt_decode from "jwt-decode";

const baseURL = 'https://enchanting-ruby-nightingale.cyclic.app/';

function getToken() {
  // Get token from local storage
  const tokenFromLocalStorage = localStorage.getItem('web-token');
  return tokenFromLocalStorage || '';
}

function saveToken(token) {
  // Save token in local storage
  localStorage.setItem('web-token', token);
}

function decodeToken() {
    const token = getToken();
    if (!token) {
      return '';
    }
    try {
      const decoded = jwt_decode(token);
      const userID = decoded.user_id;
      const username = decoded.username;
      return { userID, username };
    } catch (error) {
      return '';
    }
  }
  

function logout() {
  localStorage.removeItem('web-token');
  window.location.href = 'http://localhost:3000/';
              
  // Perform any additional logout logic (e.g., redirecting to the login page)
}

export { saveToken, decodeToken, logout, getToken, baseURL };
