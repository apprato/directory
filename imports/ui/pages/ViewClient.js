import React from 'react';
import { Alert, Row, Col, Panel, Image } from 'react-bootstrap';
import { Bert } from 'meteor/themeteorchef:bert';

const ViewClient = ({ client }) => (
  <div className="ViewClient">
    <Panel header={ client.title + " - " + client.sex }>
      <Row>
        <Col xs={ 12 } sm={ 3 }>
          <Image src={ "/" + client.image } alt={ client.title } responsive />
        </Col>
        <Col xs={ 12 } sm={ 9 }>
          <p><strong>Description:</strong> { client.description }</p>
          <p>{ client.height }</p>
          <p>{ client.weight }</p>
          <p>{ client.sex }</p>
        </Col>
      </Row>
    </Panel>
  </div>
);

ViewClient.propTypes = {
  client: React.PropTypes.object,
};

export default ViewClient;
