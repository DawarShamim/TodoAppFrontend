import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function ProfileCard(props) {
  return (<>
      <h1>Profile Page</h1>
    <Container className="d-flex justify-content-center align-items-center " >
      <Card style={{ width: "800px" }}>
        <Card.Body>
          <Row>
            <Col xs={4}>
              <div>Name:</div>
              <div>Email:</div>
              <div>Phone Number:</div>
              <div>Date of Birth:</div>
            </Col>
            <Col xs={8}>
              <div>{props._name}</div>
              <div>{props._email}</div>
              <div>{props._phoneno}</div>
              <div>{props._birthday}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}

export default ProfileCard;
