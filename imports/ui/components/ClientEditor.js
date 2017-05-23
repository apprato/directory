/* eslint-disable max-len, no-return-assign */

import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Row, Col } from 'react-bootstrap';
import clientEditor from '../../modules/client-editor.js';

export default class ClientEditor extends React.Component {
  componentDidMount() {
    clientEditor({ component: this });
    setTimeout(() => { document.querySelector('[name="title"]').focus(); }, 0);
  }

  render() {
    const { client } = this.props;
    return (<form
      ref={ form => (this.clientEditorForm = form) }
      onSubmit={ event => event.preventDefault() }>
      <Row>
        <Col xs={ 12 } sm={ 12 } md={ 12 }>
          <p>When you submit a proposal, clients review your proposal to decide if your skills and experience match what they are looking for. It's time create a profile with the jobs you want in mind. This is your opportunity to market your freelance business to clients.</p>
          <p>Note that your profile must be approved, so take time to fill it out accurately.</p>
          <p>Looking for inspiration? Checkout out these strong profile examples from ... & ... & ...</p>
        </Col>
        <Col xs={ 12 } sm={ 12 } md={ 12 }>
          <h3>Tell us more about you</h3>
          <h4>Please upload a professional portrait that clearly shows your face</h4>
        </Col>
      </Row>
      <FormGroup>
        <ControlLabel>Title</ControlLabel>
        <FormControl
          type="text"
          name="title"
          defaultValue={ client && client.title }
          placeholder="Mr,Mrs,Miss,Doctor etc"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Description</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="description"
          defaultValue={ client && client.description }
          placeholder="Tell us about what you'd like to achieve"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Height</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="height"
          defaultValue={ client && client.description }
          placeholder="Height in cm"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Weight</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="weight"
          defaultValue={ client && client.description }
          placeholder="Weight in kg"
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Gender</ControlLabel>
        <FormControl
          componentClass="textarea"
          name="sex"
          defaultValue={ client && client.description }
          placeholder="Gender"
        />
      </FormGroup>
      <Button type="submit" bsStyle="success">
        { client && client._id ? 'Save Changes' : 'Add Your Fit Request' }
      </Button>
    </form>);
  }
}

clientEditor.propTypes = {
  client: React.PropTypes.object,
};
