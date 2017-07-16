import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Trainers  from '../../api/trainers/trainers.js';
import TrainersList from '../components/TrainersList.js';
import Loading from '../components/Loading.js';

const searchQuery = new ReactiveVar(null);

const composer = ({ params }, onData) => {
  // Get total count
  Meteor.apply('getTrainersCount', [], true, function(err, result){
    Session.set('trainerCount', result);
  });

  console.log('params.area: ' + params.area);
  const limit = 10;
  const currentPage = parseInt(params._id) || 1;
  const skipCount = ( currentPage - 1)   * 10;
  const pageCount = Math.ceil(Session.get('trainerCount') / 10);
  const pagerCount = check(Math.ceil(Session.get('trainerCount') / 10), Number);

  const subscription = Meteor.subscribe('trainers.list', skipCount, parseInt(currentPage));
  if (subscription.ready()) {
    const trainers = Trainers.find().fetch(); // Converts MongoDB data into an array rather than cursor
    onData(null, { trainers, searchQuery, pageCount, currentPage });
  }
};

export default composeWithTracker(composer, Loading)(TrainersList); // The wrap of the containers
