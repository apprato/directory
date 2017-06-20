import { Meteor } from 'meteor/meteor';
import { ReactiveVar } from 'meteor/reactive-var';
import { composeWithTracker } from 'react-komposer';
import { Trainers } from '../../api/trainers/trainers.js';
import TrainersList from '../components/Trainers.js';
import { Loading } from '../components/Loading.js';

const searchQuery = new ReactiveVar(null);

const composer = (props, onData) => {
  const subscription = Meteor.subscribe('trainers.search', searchQuery.get());

  if (subscription.ready()) {
    const trainers = Trainers.find().fetch(); // Converts MongoDB data into an array rather than cursor
    onData(null, { trainers, searchQuery });
  }
};

export default composeWithTracker(composer, Loading)(TrainersList); // The wrap of the containers
