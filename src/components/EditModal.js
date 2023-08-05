import React, { useState,useEffect} from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
import { baseURL, config_header } from '../services/base.services';

// Move API functions outside the component
const EditTaskAPI = async (taskData,id) => {
  try {
    console.log(taskData,id);
    const response = await axios.put(`${baseURL}api/Task/changeTask/${id}`, taskData, config_header());
    // Check the status code
    console.log(response);
    if (response.status === 200) {
      return response;
    }
    else if (response.request.status === 406) {
      alert("Due Date cannot be in the Past.");
      return;
    } 
    else if (response.request.status === 500) {
      alert("Error Updating task.");
      return;
    }
  } catch (error) {
    throw error;
  }
};

function EditModal(props) {
    const { id, title, description, due_date, priority} = props.Editdata;

    let formattedDueDate = "";
    try {
      const dateObj = new Date(due_date);
      if (!isNaN(dateObj.getTime())) {
        // Check if the date is valid
        formattedDueDate = dateObj.toISOString().slice(0, 10);
      }
    } catch (error) {
      console.error("Invalid date format:", error.message);
      // Handle the error here, such as setting a default date or showing an error message
    }
  
    // Set the default values using the extracted data
    useEffect(() => {
      setTitle(title || ""); // Use an empty string if title is undefined
      setDescription(description || "");
      setDueDate(formattedDueDate || ""); // Use the formatted date or an empty string if invalid
      setPriority(priority || "");
    }, [title, description, formattedDueDate, priority]);
  

  const [Title, setTitle] = useState("");
    
  const [Description, setDescription] = useState("");
  const [DueDate, setDueDate] = useState("");
  const [Priority, setPriority] = useState("");


  const handleClose = () => {
    // Reset the input fields when the modal is closed
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("");
    // Call the onClose prop to handle modal closing
    props.refresher();
    props.onClose();
  };

  const handleCreate = async () => {
    if (props.type === "Task") {
      try {
        if (Title === '' || Description === '') {
          alert("*Fill the Required Fields");
          return;
        }

        const priorityValue = Priority.trim() === "" ? "Low" : Priority;
        const dueDateValue = DueDate ? new Date(DueDate) : new Date();
        dueDateValue.setDate(dueDateValue.getDate() + 1);

        const taskData = {
          Title,
          Description,
          DueDate: dueDateValue,
          Priority: priorityValue,
        };
        await EditTaskAPI(taskData,id);
        handleClose();
      } catch (error) {
        console.error("Failed to create task:", error.message);
        if(error.message==="Request failed with status code 406"){
          alert("Due Date cannot be in the Past.")
        };
        // alert(error.message);
      }
    } 
    };

  return (
    <div>
      <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
  </Form>
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

export default EditModal;
