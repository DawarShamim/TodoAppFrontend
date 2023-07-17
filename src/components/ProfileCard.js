import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

function ProfileCard(props) {
  return (<>
      <h1>Profile Page</h1>
    <Container className="d-flex justify-content-center align-items-center " >
      <Card style={{ width: "800px" }}>
        <Card.Body>
          <Row>
            <Col xs={4} className="p-1">
              <div className="profile-field">First Name:</div>
              <div className="profile-field">Last Name:</div>
              <div className="profile-field">Email:</div>              
              <div className="profile-field">Username:</div>              
              <div className="profile-field">Date of Birth:</div>
              <div className="profile-value">Account Created On:</div>
            </Col>
            <Col xs={8} className="p-1">
              <div className="profile-field">{props._firstname}</div>
              <div className="profile-field">{props._lastname}</div>
              <div className="profile-field">{props._email}</div>
              <div className="profile-field">{props._UserName}</div>
              <div className="profile-field">{props._birthday}</div>
              <div className="profile-value">{props._time}</div>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
    </>
  );
}

export default ProfileCard;
