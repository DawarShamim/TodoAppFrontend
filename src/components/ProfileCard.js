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
              <div>First Name:</div>
              <div>Last Name:</div>
              <div>Email:</div>
              <div>Username:</div>
              <div>Date of Birth:</div>
            </Col>
            <Col xs={8}>
              <div>{props._firstname}</div>
              <div>{props._lastname}</div>
              <div>{props._email}</div>
              <div>{props._UserName}</div>
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
