/* eslint-disable no-undef */

import { browserHistory } from 'react-router';
import { Bert } from 'meteor/themeteorchef:bert';
import { upsertArticle } from '../api/articles/methods.js';
import './validation.js';

let component;

const handleUpsert = () => {
  const { doc } = component.props;
  const confirmation = doc && doc._id ? 'Article updated!' : 'Article added!';
  const upsert = {
    title: article.querySelector('[name="title"]').value.trim(),
    //body: article.querySelector('[name="body"]').value.trim(),
    body: component.description.model,
  };

  if (doc && doc._id) upsert._id = doc._id;

  upsertArticle.call(upsert, (error, response) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
      component.articleEditorForm.reset();
      Bert.alert(confirmation, 'success');
      browserHistory.push(`/articles/${response.insertedId || doc._id}`);
    }
  });
};

const validate = () => {
  $(component.articleEditorForm).validate({
    rules: {
      title: {
        required: true,
      },
      body: {
        required: true,
      },
    },
    messages: {
      title: {
        required: 'Need a title in here, Seuss.',
      },
      body: {
        required: 'This thneeds a body, please.',
      },
    },
    submitHandler() { handleUpsert(); },
  });
};

export default function articleEditor(options) {
  component = options.component;
  validate();
}
