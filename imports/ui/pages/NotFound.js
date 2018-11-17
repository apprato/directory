import React from 'react';
import { Alert } from 'react-bootstrap';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-8316432-2');
ReactGA.pageview(window.location.pathname + window.location.search);

const NotFound = () => (
  <div className="NotFound">
    <Alert bsStyle="danger">
      <p><strong>Error [404]</strong>: {window.location.pathname} does not exist.</p>
    </Alert>
  </div>
);

export default NotFound;
