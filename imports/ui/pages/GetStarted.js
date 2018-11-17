import React from 'react';
import { Row, Col, Button, Glyphicon, Jumbotron } from 'react-bootstrap';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-8316432-2');
ReactGA.pageview(window.location.pathname + window.location.search);

const Index = () => (
  <div className="GetStarted">
    <Jumbotron className="text-center">
      <h1>Create your Health & Fitness Business Listing</h1>
      <p>Join the growing number of heatlh experts australia wide and<br />fill in our simple sign up and get your listing online now</p>
      <p><a className="btn btn-success" href="/signup/trainer" role="button">Get Started</a></p>
    </Jumbotron>
  </div>
);

export default Index;
