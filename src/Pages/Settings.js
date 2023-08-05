import React, { useState, useEffect } from "react";
import axios from "axios";
import { config_header, baseURL } from "../services/base.services";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Settings() {
    const navigate = useNavigate();
  const [firstname, setFirstname] = useState('Not Available');
  const [lastname, setLastname] = useState('Not Available');
  const [isLoading,setLoading] = useState(false);
  const [defaultFname,setdeFname] = useState('');
  const [defaultLname,setdeLname] = useState('');
//   const [birthday, setBirthday] = useState('Not Available');

const config = config_header();
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${baseURL}api/User/userProfile`, config);
      const { success, message, user } = response.data;
      if (success) {
        setFirstname(user.firstName);
        setLastname(user.lastName);
        setdeFname(user.firstName);
        setdeLname(user.lastName);
        
        // const dateOfBirth = new Date(user.dateOfBirth);
        // const formattedDateOfBirth = dateOfBirth.toLocaleDateString();
        // setBirthday(formattedDateOfBirth);
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

  async function HandleUpdate(){
    
    setLoading(true);
    if (!firstname.trim() && !lastname.trim()){
        console.log("heelo");
        navigate('/profile')
        setLoading(false);
        alert(`Updated Profile successfully`);
        return ;
    };
        
    const payload = {
        firstName: firstname.trim() || defaultFname,
        lastName: lastname.trim() || defaultLname,
      };
      try {
        await axios.put(`${baseURL}api/User/updateProfile`, payload, config);
        navigate('/profile')
        alert(`Updated Profile successfully`);
        setLoading(false);
      } catch (error) {
        alert('Updation failed');
        setLoading(false);
        
      }
    };



  return (
    <>
    <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Update Profile</h4>
                          <Form className="section text-center">
                            <Form.Group controlId="formFname">
                            <Row className="form-group mt-2">
                                <Col>
                                <Form.Label>First Name</Form.Label>
                                </Col>
                                <Col >
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
                            <Row className="form-group mt-2">
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
        {/* <Form.Group controlId="formBday">
          <Row className="form-group">
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
        </Form.Group> */}
      </Form>
                          <button className="btn mt-5"
                          onClick={HandleUpdate} disabled ={isLoading}
                          >Update</button>
                        </div>
                      </div>
                    </div>

      </div>
      </div>
    </>
  );
}

export default Settings;
