import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import Clients from '../containers/Clients.js';


const Index = () => (
  <div className="Index">
    <Jumbotron className="text-center">
      <h1>Submit & Find Health & Fitness</h1>
      <p>Search Australia's biggest Health and fitness directory of businesses and locations in Australia</p>
      <p><a className="btn btn-success" href="/getstarted" role="button">List your Business</a></p>
    </Jumbotron>
  </div>
);



export default Index;
