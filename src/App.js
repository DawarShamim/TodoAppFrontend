import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SignupLogin from './components/SignupLogin.component';
import Home from './components/Home.component';
import Profile from './components/Profile.component';
const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  // Add your logic to check if the token is valid and authentic
  // You can validate the token against your server or perform any necessary checks
  // Return true if the token is valid and authentic, false otherwise
  return token !== null && token !== undefined; // Example check, modify as per your authentication mechanism
};


function App() {
  return (
    <Router>
      <div className="App">
        <nav className={`navbar navbar-expand-lg navbar-light fixed-top ${isLoggedIn() ? 'disabled' : ''}`}>
          <div className="container">
            <Link className="navbar-brand" to={'/login'}>
              positronX
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/home'}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/profile'}>
                    Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
            <Routes>
              <Route exact path="/" element={<SignupLogin />} />
              <Route path="/login" element={<SignupLogin />} />
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={isLoggedIn() ? null : <Navigate to="/login" replace />}
          />
            </Routes>
          </div>
    </Router>
  );
}

export default App;
