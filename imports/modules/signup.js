/* eslint-disable no-undef */

//import { browserHistory } from 'react-router';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';

import { Accounts } from 'meteor/accounts-base';
import { Bert } from 'meteor/themeteorchef:bert';
import './validation.js';

let component;

const getUserData = () => ({
  email: document.querySelector('[name="emailAddress"]').value,
  password: document.querySelector('[name="password"]').value,
  profile: {
    name: {
      first: document.querySelector('[name="firstName"]').value,
      last: document.querySelector('[name="lastName"]').value,
    },
    country: document.querySelector('[id="country"]').value,
    hearAbout: document.querySelector('[id="hearAbout"]').value
  }
});

const signup = () => {
  const user = getUserData();
  //console.dir(component.props.route.name);
  component.props.route.name == 'signup-client' ? user.profile.roles = ['client']: '';
  component.props.route.name == 'signup-trainer' ? user.profile.roles = ['supplier']: '';


  Accounts.createUser(user, (error) => {
    if (error) {
      Bert.alert(error.reason, 'danger');
    } else {
//      Meteor.call( 'sendVerificationLink', ( error, response ) => {
        if ( error ) {
          Bert.alert( error.reason, 'danger' );
        } else {
          Bert.alert( 'Welcome!', 'success' );
          browserHistory.push('/trainer/new/experience');
        }
//      });
    }
  });
};

const validate = () => {
  $(component.signupForm).validate({
    rules: {
      firstName: {
        required: true,
      },
      lastName: {
        required: true,
      },
      emailAddress: {
        required: true,
        email: true,
      },
      password: {
        required: true,
        minlength: 6,
      },
      hearAbout: {
        required: true
      },
      country: {
        required: true
      }
    },
    messages: {
      firstName: {
        required: 'First name?',
      },
      lastName: {
        required: 'Last name?',
      },
      emailAddress: {
        required: 'Please enter an email address here.',
        email: 'Is this email address legit?',
      },
      password: {
        required: 'Please enter a password here.',
        minlength: 'Use at least six characters, please.',
      },
      hearAbout: {
        required: 'Please select how you heard about us.',
      },
      country: {
        required: 'Please select you country.',
      },

    },
    submitHandler() { signup(); },
  });
};

export default function handleSignup(options) {
  component = options.component;
  validate();
}
