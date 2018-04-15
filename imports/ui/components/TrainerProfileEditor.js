/* eslint-disable max-len, no-return-assign */

import React from 'react';
import ReactDOM from 'react-dom';

// Require Editor JS files.
import 'froala-editor/js/froala_editor.pkgd.min.js';

// Require Editor CSS files.
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';

// Require Font Awesome.
import 'font-awesome/css/font-awesome.css';

import FroalaEditor from 'react-froala-wysiwyg';

// Include special components if required.
// import FroalaEditorView from 'react-froala-wysiwyg/FroalaEditorView';
// import FroalaEditorA from 'react-froala-wysiwyg/FroalaEditorA';
// import FroalaEditorButton from 'react-froala-wysiwyg/FroalaEditorButton';
// import FroalaEditorImg from 'react-froala-wysiwyg/FroalaEditorImg';
// import FroalaEditorInput from 'react-froala-wysiwyg/FroalaEditorInput';
// Render Froala Editor component.

import {
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import Modal from '../components/modals/Modal';
import modals from '../../modules/modals';
import trainerProfileEditor from '../../modules/trainerProfile-editor.js';
import TrainerEducationList from '../containers/TrainerEducationList.js';
import TrainerEmploymentList from '../containers/TrainerEmploymentList.js';


export default class TrainerProfileEditor extends React.Component {


  handleModelChange(model) {
    this.description.model = model;
  }

  /* Education Modal */
  constructor(props) {

    super(props);
    const component = this;

    // Bind events
    this.handleModelChange = this.handleModelChange.bind(this);
    this.description = {
      model: ''
    };
    this.config = {
      charCounterCount: true,
      codeBeautifierOptions: {
        end_with_newline: true,
        indent_inner_html: true,
        extra_liners: "['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'ul', 'ol', 'table', 'dl']",
        brace_style: 'expand',
        indent_char: ' ',
        indent_size: 4,
        wrap_line_length: 0
      },
      fontFamily: {
        //'Arial,Helvetica,sans-serif': 'Font 1',
        //'Impact,Charcoal,sans-serif': 'Font 2',
      },
      blockTags: {
        n: 'Normal',
        h1: 'Heading 1',
        h2: 'Heading 2',
        h3: 'Heading 3'
      },
      toolbarButtons: [
        'bold', 'italic', 'underline', 'paragraphFormat', 'formatOL',
        'formatUL', 'insertHTML', 'undo', 'redo', 'html'
      ]
    }

    component.state = {
      modalShow: false,
      modalClasses: null,
      modalTitle: null,
      modalForm: null,
      modalBody: null,
      modalFooter: null,
    };

    component.modal = {
      open(modal, modalProps) {
        component.setModal({modal, show: true, props: modalProps});
      },
      close() {
        component.setModal({show: false});
      },
    };

    component.resetModal = component.resetModal.bind(component);
    component.setModal = component.setModal.bind(component);
  }

  resetModal() {
    this.setState({
      modalClasses: null,
      modalTitle: null,
      modalForm: null,
      modalBody: null,
      modalFooter: null,
    });
  }

  setModal({modal, show, props}) {
    const modalToSet = modal ? modals[modal](props, this.modal) : {};
    this.setState(Object.assign({modalShow: show}, modalToSet), () => {
      if (!show) setTimeout(() => {
        this.resetModal();
      }, 300);
    });
  }


  /* React Mounts */
  componentDidMount() {
    trainerProfileEditor({component: this});
    setTimeout(() => {
      document.querySelector('[name="businessName"]').focus();
    }, 0);
  }


  /* Form Render */
  render() {
    console.log(this.config);
    const {doc} = this.props;
    const {
      modalShow,
      modalClasses,
      modalTitle,
      modalForm,
      modalBody,
      modalFooter,
    } = this.state;

    return (<form
        ref={ form => (this.trainerProfileEditorForm = form) }
        onSubmit={ event => event.preventDefault() }>
        <Row>
          <Modal
            show={ modalShow }
            className={ modalClasses }
            title={ modalTitle }
            form={ modalForm }
            body={ modalBody }
            footer={ modalFooter }
            onHide={ this.modal.close }
          />
          <Col xs={ 12 } sm={ 12 } md={ 12 }>
            <p>This will help us connect you with the right clients and help you grow your business through
              healthfitness.
              We’ll ask you to select tasks of interest and complete a profile for review. Remember, you can always come
              back and edit this information later.</p>
          </Col>
          <Col xs={ 8 } sm={ 8 } md={ 8 }>
            <FormGroup>
              <ControlLabel>Business Name:</ControlLabel>
              <FormControl
                type="text"
                ref="businessName"
                name="businessName"
                placeholder=""
                defaultValue={ doc && doc.businessName }
              />
            </FormGroup>
            <FormGroup className="overview">
              <ControlLabel>Description:</ControlLabel>
              <FroalaEditor
                className="overview"
                componentClass="textarea"
                type="textarea"
                ref="overview"
                name="overview"
                placeholder=""
                tag='textarea'
                model={doc.overview}
                onModelChange={this.handleModelChange}
                config={this.config}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={ 8 } sm={ 8 } md={ 8 }>
            <h3>Education (Optional)</h3>
            <p>Tell us about your education history.</p>
            <div>
              <TrainerEducationList />
            </div>
            <Button
              bsStyle="primary"
              onClick={() => {
                this.modal.open('AddTrainerEducationModal');
              }}
            >Add Education Details</Button>
            <br />
            <br />
            <h3>Employment History (Optional)</h3>
            <p>Tell us about your education history.</p>
            <div>
              <TrainerEmploymentList />
            </div>
            <Button
              bsStyle="primary"
              onClick={() => {
                this.modal.open('AddTrainerEmploymentModal');
              }}
            >Add Employment Details</Button>
          </Col>
            <Col xs={ 12 } sm={ 12 } md={ 12 }>

            <br />
            <br />
            <h3>Please input your full address</h3>
            <p>We take your privacy seriously and share only your city and country with clients.</p>
            <FormGroup controlId="formAddress1Text">
              <ControlLabel>Address</ControlLabel>
              <FormControl
                type="text"
                ref="address1"
                name="address1"
                defaultValue={ doc && doc.address1 }
              />
            </FormGroup>
            <FormGroup controlId="formAddress2Text">
              <FormControl
                type="text"
                ref="address2"
                name="address2"
                defaultValue={ doc && doc.address2 }
              />
            </FormGroup>
            <FormGroup controlId="formSuburbText">
              <ControlLabel>Suburb</ControlLabel>
              <FormControl
                type="text"
                ref="suburb"
                name="suburb"
                defaultValue={ doc && doc.suburb }
              />
            </FormGroup>
            <FormGroup controlId="formCountryText">
              <ControlLabel>Country</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                ref="country"
                name="country"
                defaultValue={ doc && doc.country}
              >
                <option value="AU">Australia</option>
              </FormControl>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={ 6 } sm={ 6 } md={ 6 }>
            <Row>
              <Col xs={ 6 } sm={ 6 } md={ 6 }>
                <FormGroup controlId="formPostCodeText">
                  <ControlLabel>Post Code</ControlLabel>
                  <FormControl
                    type="text"
                    ref="postCode"
                    name="postCode"
                    defaultValue={ doc && doc.postCode }
                  />
                </FormGroup>
              </Col>
              <Col xs={ 6 } sm={ 6 } md={ 6 }>
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  ref="state"
                  name="state"
                  defaultValue={ doc && doc.state}
                >
                  <option value=""></option>
                  <option value="ACT" title="Australian Capital Territory">Australian Capital Territory</option>
                  <option value="NSW" title="New South Wales">New South Wales</option>
                  <option value="VIC" title="Northern Territory">Northern Territory</option>
                  <option value="QLD" title="Queensland">Queensland</option>
                  <option value="SA" title="South Australia">South Australia</option>
                  <option value="TAS" title="Tasmania">Tasmania</option>
                  <option value="VICc" title="Victoria">Victoria</option>
                  <option value="WA" title="Western Australia">Western Australia</option>
                </FormControl>
              </Col>
              <Col xs={ 12 } sm={ 12 } md={ 12 }>
              <FormGroup controlId="formPhoneNumberText">
                <ControlLabel>Phone number</ControlLabel>
                <FormControl
                  type="text"
                  ref="phoneNumber"
                  name="phoneNumber"
                  defaultValue={ doc && doc.phoneNumber }
                />
              </FormGroup>
              </Col>
            </Row>
          </Col>
        </Row>
        <p>See what your profile will look like to prospective clients. <a href="/help/trainer/profile">learn more</a>
        </p>
        <br />
        <br />
        <Button type="submit" bsStyle="success">
          { doc && doc._id ? 'Save Profile Details' : 'Save & Create Profile Details' }
        </Button>
        <br />
        <br />
      </form>
    );
  }
}


TrainerProfileEditor.propTypes = {
  trainer: React.PropTypes.object,
};
