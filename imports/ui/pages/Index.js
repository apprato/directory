import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import Clients from '../containers/Clients.js';


const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <h2>Find A Trainer</h2>
      <p>Submit your profile and metrics and a trainer will contact you.</p>
      <p><a className="btn btn-success" href="/getstarted" role="button">Get Started</a></p>
    </Jumbotron>
  </div>
);



export default Index;
