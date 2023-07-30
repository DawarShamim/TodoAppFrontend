import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

import axios from "axios";

import { baseURL, config_header } from '../services/base.services';

function Modalbox(props) {
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [DueDate, setDueDate] = useState("");
  const [Priority, setPriority] = useState("");

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [ConNewPass,setConNewPass]= useState("");
  const config= config_header();
  
  
 const changePasswordAPI = async (passwordData) => {
  try {
    const response = await axios.put(`${baseURL}/change-password`, passwordData,config);
    return response;
  }  catch (error) {
      throw error;
    }
  };
  const createTaskAPI = async (taskData) => {
    try{
      await axios.post(`${baseURL}api/Task/new`,taskData,config)
        .then((response) => {
          console.log(response);
          // Check the status code
          if (response.status === 200) {
            return (response);
          }
          else if(response.request.status === 500){
              return("error");
          }
        })       // Fetch data with authentication
          } catch (error) {
            console.log(error);
            return error;}};
    
  const handleCreate = async() => {
    if(props.type==="Task"){
    try {
      if(Title === '' || Description ==='' ){
        alert("*Fill the Required Fields");
        return;}

    const priorityValue = Priority.trim() === "" ? "Low" : Priority;
    const dueDateValue = DueDate ? new Date(DueDate) : new Date();
    dueDateValue.setDate(dueDateValue.getDate() + 1);

    const taskData = {
      Title,
      Description,
      DueDate: dueDateValue,
      Priority: priorityValue,
    };
      const response = await createTaskAPI(taskData); 
      if(response === "error"){

      alert("*Fill all the input fields.");
        } else{
      // if(response.response.request.status===500){console.log("messed up")};
      handleClose();}
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  }


    else if(props.type==="Password"){
      const passwordData = {
        oldPassword: currentPass,
        newPassword: newPass,
      };

      const response = await changePasswordAPI(passwordData);
      console.log("Password changed successfully:", response);

    }

    props.onClose();
  };


  const taskmodalContent =()=>{
    return(
    <Form>
    <Form.Group controlId="formTitle">
      <Row>
        <Col>
          <Form.Label>Title</Form.Label>
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Col>
      </Row>
    </Form.Group>
    <Form.Group controlId="formDescription">
      <Row>
        <Col>
          <Form.Label>Description</Form.Label>
        </Col>
        <Col>
          <Form.Control
            type="text"
            rows={3}
            placeholder="Enter description"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Col>
      </Row>
    </Form.Group>
    <Form.Group controlId="formDueDate">
      <Row>
        <Col>
          <Form.Label>Due Date</Form.Label>
        </Col>
        <Col>
          <Form.Control
            type="date"
            value={DueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Col>
      </Row>
    </Form.Group>
    <Form.Group controlId="formPriority">
      <Row>
        <Col>
          <Form.Label>Priority</Form.Label>
        </Col>
        <Col>
          <Form.Control
            as="select"
            value={Priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </Form.Control>
        </Col>
      </Row>
    </Form.Group>
  </Form>)};



const passwordmodalContent=()=>{return (<Form>
  <Form.Group controlId="formPreviousPass">
      <Row>
        <Col>
          <Form.Label>Current Password</Form.Label>
        </Col>
        <Col>
          <Form.Control
            type="password"
            placeholder="Enter Current Password"
            value={currentPass}
            onChange={(e) => setCurrentPass(e.target.value)}
          />
        </Col>
      </Row>
    </Form.Group>
    <Form.Group controlId="formNewPass">
      <Row>
        <Col>
          <Form.Label>New Password</Form.Label>
        </Col>
        <Col>
          <Form.Control
            type="password"
            placeholder="Enter New Password"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
          />
        </Col>
      </Row>
    </Form.Group>
</Form>)} ;



const handleClose = () => {
  // Reset the input fields when the modal is closed
  setTitle("");
  setDescription("");
  setDueDate("");
  setPriority("");
  setCurrentPass("");
  setNewPass("");
  setConNewPass("");

  // Call the onClose prop to handle modal closing
  props.onClose();
};

const modalrender=()=>{
if(props.type==="Task"){return taskmodalContent()}
else if (props.type==="Password"){return passwordmodalContent()}

};

  return (
    <div>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {modalrender()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Modalbox;
