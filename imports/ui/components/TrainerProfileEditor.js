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
import Modal from '../components/modals/Modal';
import modals from '../../modules/modals';
import trainerProfileEditor from '../../modules/trainerProfile-editor.js';
import TrainerEducationList from '../containers/TrainerEducationList.js';
import TrainerEmploymentList from '../containers/TrainerEmploymentList.js';


export default class TrainerProfileEditor extends React.Component {

  /* Education Modal */
  constructor(props) {
    super(props);
    //this.state = {userInput: this.props.user.first_name};
    const component = this;

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
      document.querySelector('[name="professionalTitle"]').focus();
    }, 0);
  }


  /* Form Render */
  render() {
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
              findatrainer.
              We’ll ask you to select tasks of interest and complete a profile for review. Remember, you can always come
              back and edit this information later.</p>
          </Col>
          <Col xs={ 8 } sm={ 8 } md={ 8 }>
            <FormGroup>
              <ControlLabel>Add a professional title that describes the work you do:</ControlLabel>
              <FormControl
                type="text"
                ref="professionalTitle"
                name="professionalTitle"
                placeholder="EXAMPLE: Yoga & Pilates Specialist"
                defaultValue={ doc && doc.professionalTitle }
              />
            </FormGroup>
            <FormGroup className="overview">
              <ControlLabel>Write a brief professional overview:</ControlLabel>
              <FormControl
                className="overview"
                componentClass="textarea"
                type="textarea"
                ref="overview"
                name="overview"
                placeholder="After 8 years of working as a full time Yoga and Pilates instructor, I have a thorough and in-depth knowledge of both disciplines. I have worked with all experience levels from beginners to experts, helping my clients with a vast array of results including strength gains, core stability improvement, injury recovery and pregnancy exercises.
Yoga and Pilates are the best exercises to help build core strength and flexibility. They are also low impact workouts so are good for your joints and have a fast recovery time.
If you’re looking to get started in either of these disciplines or have been doing them for a long time and want to work with a new trainer, I can help you achieve your goals."
                defaultValue={ doc && doc.overview }
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={ 8 } sm={ 8 } md={ 8 }>
            <h3>Education</h3>
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
            <h3>Employment History</h3>
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
            <br />
            <br />
            <FormGroup controlId="formEnglishProficiencyText">
              <ControlLabel>What is your English proficiency?</ControlLabel>
              <FormControl componentClass="select" placeholder="select"
                           ref="englishProficiency"
                           defaultValue={ doc && doc.englishProficiency }
                           name="englishProficiency">
                <option value="">Select your proficiency</option>
                <option value="1">Basic - I am only able to communicate in this language through written communication</option>
                <option value="2">Conversational - I know this language well enough to verbally discuss project details with a client</option>
                <option value="3">Fluent - I have complete command of this language with perfect grammar</option>
                <option value="4">Native or Bilingual - I have complete command of this language, including breadth of
                  vocabulary, idioms, and colloquialisms
                </option>
              </FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Hourly Rate<br/>Total amount the client will see:<br/>*You will be able to change your rate for individual jobs. This amount </ControlLabel>
              <FormControl
                type="text"
                ref="hourlyRate"
                name="hourlyRate"
                placeholder="0.00"
                defaultValue={ doc && doc.hourlyRate }
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>You'll be paid<br/>
                The estimated amount you'll receive after service fees</ControlLabel>
              <FormControl
                type="text"
                ref="paidRate"
                name="paidRate"
                placeholder="0.00"
                defaultValue={ doc && doc.paidRate }
              />
            </FormGroup>
            <h3>Add your availability</h3>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>How many hours do you have available for work each week?</ControlLabel>
              <FormControl
                componentClass="select"
                placeholder="select"
                ref="availability"
                name="availability"
                defaultValue={ doc && doc.availability }
              >
                <option value="">Please select your availability</option>
                <option value=">_30">More than 30 hrs/week</option>
                <option value="<_30">Less than 30 hrs/week</option>
                <option value="open">As Needed - Open to Offers</option>
              </FormControl>
            </FormGroup>
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
            <FormGroup controlId="formCityText">
              <ControlLabel>City</ControlLabel>
              <FormControl
                type="text"
                ref="city"
                name="city"
                defaultValue={ doc && doc.city }
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
                <option value=""></option>
                <option value="AF">Afghanistan</option>
                <option value="AX">Åland Islands</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AS">American Samoa</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AI">Anguilla</option>
                <option value="AQ">Antarctica</option>
                <option value="AG">Antigua and Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AW">Aruba</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Belarus</option>
                <option value="BE">Belgium</option>
                <option value="BZ">Belize</option>
                <option value="BJ">Benin</option>
                <option value="BM">Bermuda</option>
                <option value="BT">Bhutan</option>
                <option value="BO">Bolivia</option>
                <option value="BA">Bosnia and Herzegovina</option>
                <option value="BW">Botswana</option>
                <option value="BV">Bouvet Island</option>
                <option value="BR">Brazil</option>
                <option value="IO">British Indian Ocean Territory</option>
                <option value="VG">British Virgin Islands</option>
                <option value="BN">Brunei</option>
                <option value="BG">Bulgaria</option>
                <option value="BF">Burkina Faso</option>
                <option value="BI">Burundi</option>
                <option value="KH">Cambodia</option>
                <option value="CM">Cameroon</option>
                <option value="CA">Canada</option>
                <option value="CV">Cape Verde</option>
                <option value="KY">Cayman Islands</option>
                <option value="CF">Central African Republic</option>
                <option value="TD">Chad</option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CX">Christmas Island</option>
                <option value="CC">Cocos (Keeling) Islands</option>
                <option value="CO">Colombia</option>
                <option value="KM">Comoros</option>
                <option value="CG">Congo - Brazzaville</option>
                <option value="CD">Congo - Kinshasa</option>
                <option value="CK">Cook Islands</option>
                <option value="CR">Costa Rica</option>
                <option value="CI">Côte d’Ivoire</option>
                <option value="HR">Croatia</option>
                <option value="CU">Cuba</option>
                <option value="CY">Cyprus</option>
                <option value="CZ">Czech Republic</option>
                <option value="DK">Denmark</option>
                <option value="DJ">Djibouti</option>
                <option value="DM">Dominica</option>
                <option value="DO">Dominican Republic</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egypt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Equatorial Guinea</option>
                <option value="ER">Eritrea</option>
                <option value="EE">Estonia</option>
                <option value="ET">Ethiopia</option>
                <option value="FK">Falkland Islands</option>
                <option value="FO">Faroe Islands</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finland</option>
                <option value="FR">France</option>
                <option value="GF">French Guiana</option>
                <option value="PF">French Polynesia</option>
                <option value="TF">French Southern Territories</option>
                <option value="GA">Gabon</option>
                <option value="GM">Gambia</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germany</option>
                <option value="GH">Ghana</option>
                <option value="GI">Gibraltar</option>
                <option value="GR">Greece</option>
                <option value="GL">Greenland</option>
                <option value="GD">Grenada</option>
                <option value="GP">Guadeloupe</option>
                <option value="GU">Guam</option>
                <option value="GT">Guatemala</option>
                <option value="GG">Guernsey</option>
                <option value="GN">Guinea</option>
                <option value="GW">Guinea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HM">Heard &amp; McDonald Islands</option>
                <option value="HN">Honduras</option>
                <option value="HK">Hong Kong SAR China</option>
                <option value="HU">Hungary</option>
                <option value="IS">Iceland</option>
                <option value="IN">India</option>
                <option value="ID">Indonesia</option>
                <option value="IR">Iran</option>
                <option value="IQ">Iraq</option>
                <option value="IE">Ireland</option>
                <option value="IM">Isle of Man</option>
                <option value="IL">Israel</option>
                <option value="IT">Italy</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japan</option>
                <option value="JE">Jersey</option>
                <option value="JO">Jordan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="KW">Kuwait</option>
                <option value="KG">Kyrgyzstan</option>
                <option value="LA">Laos</option>
                <option value="LV">Latvia</option>
                <option value="LB">Lebanon</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Libya</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lithuania</option>
                <option value="LU">Luxembourg</option>
                <option value="MO">Macau SAR China</option>
                <option value="MK">Macedonia</option>
                <option value="MG">Madagascar</option>
                <option value="MW">Malawi</option>
                <option value="MY">Malaysia</option>
                <option value="MV">Maldives</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MH">Marshall Islands</option>
                <option value="MQ">Martinique</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius</option>
                <option value="YT">Mayotte</option>
                <option value="MX">Mexico</option>
                <option value="FM">Micronesia</option>
                <option value="MD">Moldova</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Montenegro</option>
                <option value="MS">Montserrat</option>
                <option value="MA">Morocco</option>
                <option value="MZ">Mozambique</option>
                <option value="MM">Myanmar (Burma)</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Netherlands</option>
                <option value="AN">Netherlands Antilles</option>
                <option value="NC">New Caledonia</option>
                <option value="NZ">New Zealand</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria</option>
                <option value="NU">Niue</option>
                <option value="NF">Norfolk Island</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="KP">North Korea</option>
                <option value="NO">Norway</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PS">Palestinian Territories</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua New Guinea</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Philippines</option>
                <option value="PN">Pitcairn Islands</option>
                <option value="PL">Poland</option>
                <option value="PT">Portugal</option>
                <option value="PR">Puerto Rico</option>
                <option value="QA">Qatar</option>
                <option value="RE">Réunion</option>
                <option value="RO">Romania</option>
                <option value="RU">Russia</option>
                <option value="RW">Rwanda</option>
                <option value="BL">Saint Barthélemy</option>
                <option value="SH">Saint Helena</option>
                <option value="KN">Saint Kitts and Nevis</option>
                <option value="LC">Saint Lucia</option>
                <option value="MF">Saint Martin</option>
                <option value="PM">Saint Pierre and Miquelon</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="ST">São Tomé and Príncipe</option>
                <option value="SA">Saudi Arabia</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="SC">Seychelles</option>
                <option value="SL">Sierra Leone</option>
                <option value="SG">Singapore</option>
                <option value="SK">Slovakia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Solomon Islands</option>
                <option value="SO">Somalia</option>
                <option value="ZA">South Africa</option>
                <option value="GS">South Georgia &amp; South Sandwich Islands</option>
                <option value="KR">South Korea</option>
                <option value="ES">Spain</option>
                <option value="LK">Sri Lanka</option>
                <option value="VC">St. Vincent &amp; Grenadines</option>
                <option value="SD">Sudan</option>
                <option value="SR">Suriname</option>
                <option value="SJ">Svalbard and Jan Mayen</option>
                <option value="SZ">Swaziland</option>
                <option value="SE">Sweden</option>
                <option value="CH">Switzerland</option>
                <option value="SY">Syria</option>
                <option value="TW">Taiwan</option>
                <option value="TJ">Tajikistan</option>
                <option value="TZ">Tanzania</option>
                <option value="TH">Thailand</option>
                <option value="TL">Timor-Leste</option>
                <option value="TG">Togo</option>
                <option value="TK">Tokelau</option>
                <option value="TO">Tonga</option>
                <option value="TT">Trinidad and Tobago</option>
                <option value="TN">Tunisia</option>
                <option value="TR">Turkey</option>
                <option value="TM">Turkmenistan</option>
                <option value="TC">Turks and Caicos Islands</option>
                <option value="TV">Tuvalu</option>
                <option value="UG">Uganda</option>
                <option value="GB">U.K.</option>
                <option value="UA">Ukraine</option>
                <option value="AE">United Arab Emirates</option>
                <option value="UY">Uruguay</option>
                <option value="US">U.S.</option>
                <option value="UM">U.S. Outlying Islands</option>
                <option value="VI">U.S. Virgin Islands</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VA">Vatican City</option>
                <option value="VE">Venezuela</option>
                <option value="VN">Vietnam</option>
                <option value="WF">Wallis and Futuna</option>
                <option value="EH">Western Sahara</option>
                <option value="YE">Yemen</option>
                <option value="ZM">Zambia</option>
                <option value="ZW">Zimbabwe</option>
              </FormControl>
            </FormGroup>
            <FormGroup controlId="formPostCodeText">
              <ControlLabel>Post Code</ControlLabel>
              <FormControl
                type="text"
                ref="postCode"
                name="postCode"
                defaultValue={ doc && doc.postCode }
              />
            </FormGroup>
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
        <p>See what your profile will look like to prospective clients. <a href="/help/trainer/profile">learn more</a>
        </p>
        <br />
        <br />
        <Button type="submit" bsStyle="success">
          { doc && doc._id ? 'Save Experience' : 'Save & Create Profile' }
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
