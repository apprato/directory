import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Trainers  from '../../api/trainers/trainers.js';
import TrainersList from '../components/TrainersList.js';
import Loading from '../components/Loading.js';

const searchQuery = new ReactiveVar(null);

const composer = ({ params }, onData) => {
  // Get total count
  Meteor.apply('getTrainersCount', [], true, function(err, result){  Session.set('trainerCount', result); console.log(result) });
  const limit = 10;
  const currentPage = parseInt(params._id) || 1;
  const skipCount = ( currentPage - 1) * 10;
  const pageCount = Session.get('trainerCount');

  console.log('total: ' + Session.get('trainerCount') );

  const subscription = Meteor.subscribe('trainers.list',skipCount);
  if (subscription.ready()) {
    const trainers = Trainers.find().fetch(); // Converts MongoDB data into an array rather than cursor
    onData(null, { trainers, searchQuery, pageCount });
  }
};

export default composeWithTracker(composer, Loading)(TrainersList); // The wrap of the containers
