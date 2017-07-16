/* eslint-disable max-len */

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.js';
import Documents from '../../ui/pages/Documents.js';
import NewDocument from '../../ui/pages/NewDocument.js';
import EditDocument from '../../ui/containers/EditDocument.js';
import ViewDocument from '../../ui/containers/ViewDocument.js';
import Index from '../../ui/pages/Index.js';
import Login from '../../ui/pages/Login.js';
import NotFound from '../../ui/pages/NotFound.js';
import RecoverPassword from '../../ui/pages/RecoverPassword.js';
import ResetPassword from '../../ui/pages/ResetPassword.js';
import Signup from '../../ui/pages/Signup.js';
import GetStarted from '../../ui/pages/GetStarted.js';
import Clients from '../../ui/pages/Clients.js';
import Trainers from '../../ui/containers/TrainersList.js';
import NewTrainerExperience from '../../ui/pages/NewTrainerExperience.js';
import EditTrainerExperience from '../../ui/containers/EditTrainerExperience.js';
import NewTrainerProfile from '../../ui/pages/NewTrainerProfile.js';
import EditTrainerProfile from '../../ui/containers/EditTrainerProfile.js';
import ViewClient from '../../ui/containers/ViewClient.js';
import ViewTrainer from '../../ui/containers/ViewTrainer.js';
import NewClient from '../../ui/pages/NewClient.js';


const authenticate = (nextState, replace) => {
  if (!Meteor.loggingIn() && !Meteor.userId()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
};

Meteor.startup(() => {
  render(
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute name="index" component={ Index } />
        <Route name="documents" path="/documents" component={ Documents } onEnter={ authenticate } />
        <Route name="newDocument" path="/documents/new" component={ NewDocument } onEnter={ authenticate } />
        <Route name="editDocument" path="/documents/:_id/edit" component={ EditDocument } onEnter={ authenticate } />
        <Route name="viewDocument" path="/documents/:_id" component={ ViewDocument } onEnter={ authenticate } />
        <Route name="login" path="/login" component={ Login } />
        <Route name="recover-password" path="/recover-password" component={ RecoverPassword } />
        <Route name="reset-password" path="/reset-password/:token" component={ ResetPassword } />
        <Route name="signup" path="/signup" component={ Signup } />
        <Route name="signup-client" path="/signup/client" component={ Signup } />
        <Route name="signup-trainer" path="/signup/trainer" component={ Signup } />
        <Route name="clients" path="/clients" component={ Clients } />

        <Route name="trainers" path="/directory" component={ Trainers } />
        <Route name="listTrainersPagination" path="/directory/page/:_id" component={ Trainers } />

        <Route name="listTrainersPagination" path="/directory/:area" component={ Trainers } />
        <Route name="listTrainersPagination" path="/directory/:area/page/:_id" component={ Trainers } />

        <Route name="viewTrainer" path="/directory/:_id" component={ ViewTrainer } />
        <Route name="NewTrainerExperience" path="/trainer/new/experience" component={ NewTrainerExperience } onEnter={ authenticate } />
        <Route name="EditTrainerExperience" path="/trainer/edit/experience" component={ EditTrainerExperience } onEnter={ authenticate } />
        <Route name="NewTrainerProfile" path="/trainer/new/profile" component={ NewTrainerProfile } onEnter={ authenticate } />
        <Route name="EditTrainerProfile" path="/trainer/edit/profile" component={ EditTrainerProfile } onEnter={ authenticate } />
        <Route name="newClient" path="/clients/new" component={ NewClient } onEnter={ authenticate } />
        <Route name="viewClient" path="/clients/:_id" component={ ViewClient } />
        <Route name="getStarted" path="/getstarted" component={ GetStarted } />
        <Route path="*" component={ NotFound } />
      </Route>
    </Router>,
    document.getElementById('react-root')
  );
});
