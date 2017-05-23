/* eslint-disable max-len, no-return-assign */

import React from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Row,
  Col,
  Popover,
  ButtonToolbar,
  OverlayTrigger,
  Radio
} from 'react-bootstrap';
import trainerExperienceEditor from '../../modules/trainerExperience-editor.js';

export default class TrainerExperienceEditor extends React.Component {
  componentDidMount() {
    trainerExperienceEditor({component: this});
    setTimeout(() => {
      $("select.skillTags").tagsinput('items');
      document.querySelector('[name="category"]').focus();
    }, 0);
  }


  render() {
    const {doc} = this.props;
    return (<form
        ref={ form => (this.trainerExperienceEditorForm = form) }
        onSubmit={ event => event.preventDefault() }>
        <Row>
          <Col xs={ 12 } sm={ 12 } md={ 12 }>
            <p>This will help us connect you with the right clients and help you grow your business through
              findatrainer.<br />
              We’ll ask you to select tasks of interest and complete a profile for review.<br /> Remember, you can
              always
              come
              back and edit this information later.</p>
          </Col>
          <Col xs={ 8 } sm={ 8 } md={ 8 }>
            <Row>
              <Col xs={ 10 } sm={ 10 } md={ 10 }>
                <h3></h3>
                <FormGroup controlId="category">
                  <ControlLabel>What is the main category of health and fitness that you are trained/experienced in?</ControlLabel>
                  <p>*If you are not professionally trained/experienced in any, please select “none”</p>
                  <FormControl
                    componentClass="select"
                    ref="category"
                    name="category"
                    defaultValue={ doc && doc.category }
                  >
                    <option value="">Please select category</option>
                    <option value="personal_trainer">Personal Training</option>
                    <option value="pilates">Pilates</option>
                    <option value="yoga">Yoga</option>
                    <option value="zumba">Zumba</option>
                    <option value="martial_arts">Martial Arts</option>
                    <option value="aerobics">Aerobics</option>
                    <option value="gymnastics">Gymnastics</option>
                    <option value="swimming">Swimming</option>
                    <option value="water_sports">Water Sports</option>
                    <option value="cycling">Cycling</option>
                    <option value="dancing">Dancing</option>
                    <option value="athletics">Athletics</option>
                    <option value="snow_sports">Snow Sports</option>
                    <option value="tennis">Tennis</option>
                    <option value="cricket">Cricket</option>
                    <option value="other">Other</option>
                    <option value="nutrition">Nutrition</option>
                    <option value="dietitians">Dietitians</option>
                    <option value="supplements">Supplements</option>
                    <option value="none">None</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={ 6 } sm={ 6 } md={ 6 }>
                <FormGroup controlId="skillTags">
                  <ControlLabel>What specific skills do you offer clients?</ControlLabel>
                  <br />
                  <FormControl componentClass="select"
                               data-role="tagsinput"
                               placeholder="Enter your skill tags"
                               ref="skillTags"
                               name="skillTags"
                               className="skillTags"
                               defaultValue={ doc && doc.experienceLevel }
                               multiple>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={ 4 } sm={ 4 } md={ 4 }>
                <ButtonToolbar>
                  <OverlayTrigger trigger="click" placement="right" overlay={popoverClick}>
                    <Button>?</Button>
                  </OverlayTrigger>
                </ButtonToolbar>
              </Col>
            </Row>
            <Row>
              <Col xs={ 10 } sm={ 10 } md={ 10 }>
                <FormGroup controlId="experienceLevel">
                  <ControlLabel>What is your work experience level?</ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    ref="experienceLevel"
                    name="experienceLevel"
                    defaultValue={ doc && doc.experienceLevel }
                  >
                    <option value="">Please select experience level</option>
                    <option value="entry_level">Entry Level</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="expert">Expert</option>
                  </FormControl>
                </FormGroup>
              </Col>
              <Col xs={ 12 } sm={ 12 } md={ 12 }>
              </Col>
            </Row>
          </Col>
        </Row>
        <Button type="submit" bsStyle="success">
          { doc && doc._id ? 'Update Training Experience' : 'Save Training Experience' }
        </Button>
      </form>
    );
  }
}

const popoverClick = (
  <Popover id="popover-trigger-click" title="Specific skills">
    <p>Type keywords here that relates to your individual skill set. This will help you to come up in
      users
      searches and be more relevant to what they want. For example: _weight loss, muscle gain, crossfit,
      reformer pilates, boxing, running, etc.
    </p>
  </Popover>
);

TrainerExperienceEditor.propTypes = {
  trainer: React.PropTypes.object,
};
