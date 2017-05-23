import React from 'react';
import { Row, Col, Button, Glyphicon } from 'react-bootstrap';

const Index = () => (
  <div className="GetStarted">
    <Row>
      <h2>Let's get started!<br />
      First, tell us what you're looking for.</h2>
    </Row>
    <Row>
      <Col xs={ 12 } sm={ 6 } md={ 6 }>
        <h3>Become a client</h3>
        <p>Get started now and be spoilt with choices as trainers approach you with similar strengths to match you areas of desired improvement</p>
        <span class="glyphicon glyphicon-briefcase"></span>
        <a class="btn" href="/signup/client"><p><Button type="submit" bsStyle="success">Find Trainers</Button></p></a>
      </Col>
      <Col xs={ 12 } sm={ 6 } md={ 6 }>
        <h3>Become a Trainier</h3>
        <p>Get started with choices of ready to go clients and supplement your spare unbilled time with revenue streams of your choosing and capacity.</p>
        <span class="glyphicon glyphicon-briefcase" aria-hidden="true"></span>
        <a class="btn" href="/signup/trainer"><p><Button type="submit" bsStyle="success">Find Suitable Work</Button></p></a>
      </Col>
    </Row>
  </div>
);

export default Index;
