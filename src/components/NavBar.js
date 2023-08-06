import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import './navbar.css';
import { logout } from '../services/base.services';
import { useNavigate} from 'react-router-dom';



function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate); // Pass navigate as an argument to the logout function
  };
  return (
    <nav  className="navbar border-bottom frost-glass navbar-expand-lg navbar-dark fixed-top">
      <div className="container " >
        <div className="d-flex justify-content-between w-100">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <Link className="navbar-brand" to="/login">
              Todo App
            </Link>
            <div>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/task/card">
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdownMenuButton1">
                    <FontAwesomeIcon icon={faUser} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="\profile">Profile</Dropdown.Item>
                    <Dropdown.Item href="\setting">Settings</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
