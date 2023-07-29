import React, { useState, useEffect } from "react";
import axios from "axios";
import { config_header, baseURL } from "../services/base.services";
import { Form, Row, Col } from "react-bootstrap";

function Settings() {
  const [firstname, setFirstname] = useState('Not Available');
  const [lastname, setLastname] = useState('Not Available');
  const [birthday, setBirthday] = useState('Not Available');

  const fetchUserProfile = async () => {
    const config = config_header();
    try {
      const response = await axios.get(`${baseURL}api/User/userProfile`, config);
      const { success, message, user } = response.data;
      if (success) {
        setFirstname(user.firstName);
        setLastname(user.lastName);
        const dateOfBirth = new Date(user.dateOfBirth);
        const formattedDateOfBirth = dateOfBirth.toLocaleDateString();
        setBirthday(formattedDateOfBirth);
      } else {
        // Handle error response
        console.error('Failed to retrieve profile:', message);
      }
    } catch (error) {
      // Handle request error
      console.error('Failed to make the request:', error.message);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []); // Fetch user profile once when the component mounts

  return (
    <>
      <Form>
        <Form.Group controlId="formFname">
          <Row>
            <Col>
              <Form.Label>First Name</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter First Name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="formLname">
          <Row>
            <Col>
              <Form.Label>Last Name</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter Last Name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="formBday">
          <Row>
            <Col>
              <Form.Label>Birthday</Form.Label>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Enter Birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Col>
          </Row>
        </Form.Group>
      </Form>
      <div>
        <p>Hello</p>
      </div>
    </>
  );
}

export default Settings;
