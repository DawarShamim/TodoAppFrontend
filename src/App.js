import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SignupLogin from './components/SignupLogin.component';

function App() {
  

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={'/login'}>
              positronX
            </Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={'/login'}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={'/sign-up'}>
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

          <div className="auth-wrapper">
          <div className="auth-inner">
          
            <Routes>
              <Route exact path="/" element={<SignupLogin />} />
              {/* <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}
export default App