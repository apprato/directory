import React from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Markup } from 'interweave';
import ReactGA from 'react-ga';

ReactGA.initialize('UA-8316432-2');
ReactGA.pageview(window.location.pathname + window.location.search);


const ViewTrainer = ({ trainer }) => (
  <div className="ViewTrainer">
    <Row>
      <Col xs={12} sm={9}>
        {trainer.logo && <Image src={'/' + 'logos' + '/' + trainer.logo} alt={trainer.businessName} responsive />}
        <h2>{trainer.businessName}</h2>
        <p><i>{trainer.category}</i></p>
        <Markup content={trainer.overview} />
      </Col>
      <Col xs={12} sm={3}>
        <h4>{trainer.phoneNumber}</h4>
        <h2>Address</h2>
        <p>{trainer.address1}</p>
        <p>{trainer.address2}</p>
        <p>{trainer.city} {trainer.state} {trainer.suburb}</p>
        <p>{trainer.postCode}</p>
        <p>{trainer.phoneNumber}</p>
        <p>
          <a href={'http://' + trainer.website}>
            {trainer.website}
          </a>
        </p>

      </Col>
    </Row>
    <Row>
      <Col xs={12} sm={12}>
        <p><a href="/directory">Back</a></p>
      </Col>
    </Row>
  </div>
);

ViewTrainer.propTypes = {
  trainer: React.PropTypes.object,
};

export default ViewTrainer;
