import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Clients from '../../api/clients/clients.js';
import ViewClient from '../pages/ViewClient.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('clients.view', params._id);

  if (subscription.ready()) {
    const client = Clients.findOne();
    onData(null, { client });
  }
};

export default composeWithTracker(composer, Loading)(ViewClient);
