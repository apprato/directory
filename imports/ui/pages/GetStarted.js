import React from 'react';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';

const Index = () => (
  <div className="GetStarted">
    <Row>
      <h2>Create your Health & Fitness Business Listing</h2>
    </Row>
    <Row>
      <Col xs={ 12 } sm={ 12 } md={ 12 }>
        <h3>Add your listing</h3>
        <p>Join the growing number of heatlh experts australia wide and<br />fill in our simple sign up and get your listing online now</p>
        <span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>
        <a class="btn" href="/signup/trainer"><p><Button type="submit" bsStyle="success">Get Started</Button></p></a>
      </Col>
    </Row>
  </div>
);

export default Index;
