/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertTrainer} from '../api/trainers/methods';
import './validation.js';

let component;

const handleUpsert = () => {
  const { trainer } = component.props;
  const confirmation = trainer && trainer._id ? 'Trainer Profile updated!' : 'Business Listing Added!';
  console.log(component.description.model);

  const upsert = {
    businessName: document.querySelector('[name="businessName"]').value,
    overview: component.description.model,
    address1: document.querySelector('[name="address1"]').value,
    address2: document.querySelector('[name="address2"]').value,
    suburb: document.querySelector('[name="suburb"]').value,
    state: document.querySelector('[name="state"]').value,
    country: document.querySelector('[name="country"]').value,
    postCode: document.querySelector('[name="postCode"]').value,
    phoneNumber: document.querySelector('[name="phoneNumber"]').value,
  };
  console.log(document.querySelector(".fr-view").innerHTML);

  if (trainer && trainer._id) upsert._id = trainer._id;

  upsertTrainer.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.trainerProfileEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push('/');
    }
  });
};

const validate = () => {
  $(component.trainerProfileEditorForm).validate({
    rules: {
      businessName: {
        required: true,
      },
      overview: {
        required: true,
      },
      englishProficiency: {
        required: true,
      },
      hourlyRate: {
        required: true,
      },
      availability: {
        required: false
      },
      address1: {
        required: true,
      },
      address2: {
        required: false,
      },
      city: {
        required: true,
      },
      country: {
        required: true,
      },
      postCode: {
        required: true,
      },
      phoneNumber: {
        required: true,
      }
    },
    messages: {
      businessName: {
        required: 'Please add your Business title.',
      },
      overview: {
        required: 'Please add a professional overview.',
      },
      englishProficiency: {
        required: 'Please select an your English proficiency.',
      },
      hourlyRate: {
        required: 'Please add your hourly rate.',
      },
      availability: {
        required: 'Please select your availability.'
      },
      address1: {
        required: 'Please add your Address Line 1.',
      },
      address2: {
        required: 'Please add your Address Line 1.',
      },
      city: {
        required: 'Please add your City.',
      },
      country: {
        required: 'Please select your country.',
      },
      postCode: {
        required: 'Please add you Postcode.',
      },
      phoneNumber: {
        required: 'Please add your Phone Number.',
      }
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function trainerExperienceEditor(options) {
  component = options.component;
  validate();
}
