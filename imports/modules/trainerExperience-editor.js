/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertTrainer} from '../api/trainers/methods';
import './validation.js';

let component;

const handleUpsert = () => {
  const { trainer } = component.props;
  const confirmation = trainer && trainer._id ? 'Trainer Experience updated!' : 'Trainer Experience added!';
  const upsert = {
    idUser: Meteor.userId(),
    category: document.querySelector('[name="category"]').value,
    //skillTags: tags, //$("select.skillTags").tagsinput('items'),
    //skillTags: $("select.skillTags").tagsinput('items'),  // [ 'array1', 'arrary2'],
    area: document.querySelector('[name="area"]').value
  };

  if (trainer && trainer._id) upsert._id = trainer._id;

  upsertTrainer.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.trainerExperienceEditorForm.reset();
      browserHistory.push('/trainer/new/profile');
      Bert.alert(confirmation, 'success');
    }
  });
};

const validate = () => {
  $(component.trainerExperienceEditorForm).validate({
    rules: {
      category: {
        required: true,
      },
      skillTags: {
        required: true,
      },
      area: {
        required: true,
      }
    },
    messages: {
      category: {
        required: 'Please select a category.',
      },
      skillTags: {
        required: 'Please add a skill tag.',
      },
      area: {
        required: 'Please select an experience level.',
      }
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function trainerExperienceEditor(options) {
  component = options.component;
  validate();
}
