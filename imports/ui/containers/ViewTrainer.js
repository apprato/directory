import { Meteor } from 'meteor/meteor';
import { composeWithTracker } from 'react-komposer';
import Trainers from '../../api/trainers/trainers.js';
import ViewTrainer from '../pages/ViewTrainer.js';
import Loading from '../components/Loading.js';

const composer = ({ params }, onData) => {
  const subscription = Meteor.subscribe('trainers.view', params._id);

  if (subscription.ready()) {
    const trainer = Trainers.findOne();
    onData(null, { trainer });
  }
};

export default composeWithTracker(composer, Loading)(ViewTrainer);
