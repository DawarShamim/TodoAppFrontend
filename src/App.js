import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SignupLogin from './Pages/SignupLogin';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Page404 from './Pages/Page404';


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
        <Routes>
          <Route exact path="/" element={<SignupLogin />} />
          <Route path="/login" element={<SignupLogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Page404 />} />
              {/* <Route path="*" element={isLoggedIn() ? null : <Navigate to="/Page404" replace />} */}
            </Routes>
          </div>
    </Router>
  );
}

export default App;
