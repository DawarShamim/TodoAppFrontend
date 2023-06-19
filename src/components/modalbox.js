import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function Modalbox(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");

  const handleCreate = () => {
    console.log("Title:", title);
    console.log("Description:", description);
    console.log("Due Date:", dueDate);
    console.log("Priority:", priority);

    props.onClose();
  };


  const taskmodalContent =()=>{return(<Form>
    <Form.Group controlId="formTitle">
      <Row>
        <Col>
          <Form.Label>Title</Form.Label>
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
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
            value={description}
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
            value={dueDate}
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
            value={priority}
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



const passwordmodalContent=()=>{return (<Form></Form>)} ;
const profilemodalContent=()=>{return (<Form></Form>)} ;


const modalrender=()=>{
if(props.type==="Task"){return taskmodalContent()}
else if (props.type==="Password"){return passwordmodalContent()}
else if (props.type==="Profile"){return profilemodalContent()}

};

  return (
    <div>
      <Modal show={props.show} onHide={props.onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {modalrender()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onClose}>
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
