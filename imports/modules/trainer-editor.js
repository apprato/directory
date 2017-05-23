/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
// import { upsertClient} from '../api/clients/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { trainer } = component.props;
  const confirmation = trainer && trainer._id ? 'Trainer updated!' : 'Trainer added!';
  /*
  const upsert = {
    title: document.querySelector('[name="title"]').value,
    description: document.querySelector('[name="description"]').value,
    height: document.querySelector('[name="height"]').value,
    weight: document.querySelector('[name="weight"]').value,
    sex: document.querySelector('[name="sex"]').value
  };

  if (trainer && trainer._id) upsert._id = client._id;

  upsertClient.call(upsert, (error, response) => {
    if (error) {
      console.dir(error);
      Bert.alert(error.reason, 'danger');
    } else {
      component.clientEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/clients/${response.insertedId || client._id}`);
    }
  });
  */
};

const validate = () => {
  /*
  $(component.clientEditorForm).validate({
    rules: {
      title: {
        required: true,
      },
      description: {
        required: true,
      },
    },
    messages: {
      title: {
        required: 'This requires a title in here.',
      },
      description: {
        required: 'This requires a body, please.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
  */
};

export default function trainerEditor(options) {
  component = options.component;
  validate();
}
