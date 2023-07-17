import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import SignupLogin from './Pages/SignupLogin';
import Home from './Pages/Home';
import Profile from './Pages/Profile';
import Page404 from './Pages/Page404';
import CardView from './Pages/CardView';
import Settings from './Pages/Settings';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<SignupLogin />} />
          <Route path="/login" element={<SignupLogin />} />
          <Route path="/task/table" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/task/card" element={<CardView />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="*" element={<Page404 />} />
            </Routes>
          </div>
    </Router>
  );
}

export default App;
