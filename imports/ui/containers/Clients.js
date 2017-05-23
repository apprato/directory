import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { composeWithTracker } from 'react-komposer';
import { Clients } from '../../api/clients/clients.js';
import ClientsList from '../components/Clients.js';
import { Loading } from '../components/Loading.js';

const searchQuery = new ReactiveVar(null);

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('clients.search', searchQuery.get());

  if (subscription.ready()) {
    const clients = Clients.find().fetch(); // Converts MongoDB data into an array rather than cursor
    onData(null, { clients, searchQuery });
  }
};

export default composeWithTracker(composer, Loading)(ClientsList); // The wrap of the containers
