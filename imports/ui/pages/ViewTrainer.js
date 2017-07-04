import React from 'react';
import {Alert, Row, Col, Panel, Image} from 'react-bootstrap';
import {Bert} from 'meteor/themeteorchef:bert';

const ViewTrainer = ({trainer}) => (
  <div className="ViewTrainer">
    <Row>
      <Col xs={ 12 } sm={ 9 }>
        <h2>{ trainer.businessName}</h2>
        <p><i>{ trainer.category}</i></p>
        <p>{ trainer.overview }</p>
      </Col>
      <Col xs={ 12 } sm={ 3 }>
        <h4>{ trainer.phoneNumber }</h4>
        <h2>Address</h2>
        <p>{ trainer.address1 }</p>
        <p>{ trainer.address2 }</p>
        <p>{ trainer.city } { trainer.state } { trainer.suburb }</p>
        <p>{ trainer.postCode }</p>
      </Col>
    </Row>
    <Row>
      <Col xs={ 12 } sm={ 12 }>
        <p><a href="/directory">Back</a></p>
      </Col>
    </Row>
  </div>
);

ViewTrainer.propTypes = {
  trainer: React.PropTypes.object,
};

export default ViewTrainer;
