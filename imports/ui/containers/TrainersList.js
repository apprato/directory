import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Trainers  from '../../api/trainers/trainers.js';
import TrainersList from '../components/TrainersList.js';
import Loading from '../components/Loading.js';

const searchQuery = new ReactiveVar(null);

const composer = ({ params }, onData) => {
  // Get total count
  Meteor.apply('getTrainersCount', [], true, function(err, result){  Session.set('trainerCount', result); });
  pageCount = Session.get('trainerCount');

  const subscription = Meteor.subscribe('trainers.list', Number(params._id));
  if (subscription.ready()) {
    const trainers = Trainers.find().fetch(); // Converts MongoDB data into an array rather than cursor
    onData(null, { trainers, searchQuery, pageCount });
  }
};

export default composeWithTracker(composer, Loading)(TrainersList); // The wrap of the containers
