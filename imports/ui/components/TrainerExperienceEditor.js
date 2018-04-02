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
} from 'react-bootstrap';
import trainerExperienceEditor from '../../modules/trainerExperience-editor.js';

export default class TrainerExperienceEditor extends React.Component {
  componentDidMount() {
    trainerExperienceEditor({component: this});
    setTimeout(() => {
      $("select.skills").tagsinput('items');
      document.querySelector('[name="category"]').focus();
    }, 0);
  }


  render() {
    const {doc} = this.props;
    console.log(doc);
    return (<form
        ref={ form => (this.trainerExperienceEditorForm = form) }
        onSubmit={ event => event.preventDefault() }>
        <Row>
          <Col xs={ 12 } sm={ 12 } md={ 12 }>
            <p>This will help us connect you with the right clients and help you grow your business through
              healthfitness.<br />
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
                    <option value="health_fitness_centre">Health Fitness Centre</option>
                    <option value="personal_training">Personal Training</option>
                    <option value="martial_arts">Martial Arts</option>
                    <option value="wellbeing_centre">Wellbeing Centre</option>
                    <option value="yoga">yoga</option>
                    <option value="exercise_equipment">Exercise Equipment</option>
                    <option value="massage_therapy">Massage Therapy</option>
                    <option value="holistic_health">Holistic Health</option>
                    <option value="corporate_health_fitness">Corporate Health Fitness</option>
                    <option value="pilates">Pilates</option>
                    <option value="nutritional_supplements">Nutritional Supplements</option>
                    <option value="life_coaching">Life Coaching</option>
                    <option value="weight_Loss">Weight Loss</option>
                    <option value="employment_and_careers">Employment and Careers</option>
                    <option value="group_health_fitness">Group Health Fitness</option>
                  </FormControl>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>City / Town / Area</ControlLabel>
                  <FormControl
                    type="text"
                    ref="area"
                    name="area"
                    placeholder=""
                    defaultValue={ doc && doc.area }
                  />
                </FormGroup>
              </Col>
              <Col xs={ 6 } sm={ 6 } md={ 6 }>
                <FormGroup controlId="skills">
                  <ControlLabel>What specific skills do you offer clients?</ControlLabel>
                  <br />
                  <FormControl componentClass="select"
                               data-role="tagsinput"
                               placeholder="Enter your skill tags"
                               ref="skills"
                               name="skills"
                               className="skills"
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
          </Col>
        </Row>
        <Button type="submit" bsStyle="success">
          { doc && doc._id ? 'Update Profile Categorisation' : 'Update Profile Categorisation' }
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
