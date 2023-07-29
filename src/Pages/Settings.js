import React,{useState} from "react";
import axios from "axios";
import { config_header,baseURL } from "../services/base.services";
import {  Form, Row, Col } from "react-bootstrap";


function Settings(){
const [firstname,setfirstname] = useState('Not Available');
const [lastname,setlastname]= useState('Not Available');
const [birthday,setBirthday]=useState('Not Available');

const fetchUserProfile = async () => {

  const config = config_header();  
  try {
    const response = await axios.get(`${baseURL}api/User/userProfile`, config);
    const { success, message, user } = response.data;  
    if (success) {
      setfirstname(user.firstName);
      setlastname(user.lastName);
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
fetchUserProfile();
    return(<>
<Form>
    <Form.Group controlId="formFname">
      <Row>
        <Col>
          <Form.Label>Title</Form.Label>
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={firstname}
            onChange={(e) => setfirstname(e.target.value)}
          />
        </Col>
      </Row>
    </Form.Group>
    <Form.Group controlId="formLname">
      <Row>
        <Col>
          <Form.Label>Description</Form.Label>
        </Col>
        <Col>
          <Form.Control
            type="text"
            rows={3}
            placeholder="Enter description"
            value={lastname}
            onChange={(e) => setlastname(e.target.value)}
          />
        </Col>
      </Row>
    </Form.Group>
    
  </Form>
        <div> <p>Hello </p></div>
    </>)
}

export default Settings;