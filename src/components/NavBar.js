import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
      <div className="container">
        <div className="d-flex justify-content-between w-100">
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <Link className="navbar-brand" to="/login">
              Todo App
            </Link>
            <div>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/home">
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
                    <Dropdown.Item href="#">Profile</Dropdown.Item>
                    <Dropdown.Item href="#">Settings</Dropdown.Item>
                    <Dropdown.Item href="#">Log out</Dropdown.Item>
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
