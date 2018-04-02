import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Trainers  from '../../api/trainers/trainers.js';
import TrainersList from '../components/TrainersList.js';
import Loading from '../components/Loading.js';

const searchQuery = new ReactiveVar(null);

const composer = ({ params }, onData) => {

  // Get total count
  Meteor.apply('getTrainersAreaCount', [], true, function(err, result){
    Session.set('trainerCount', result);
  });

  // Fliters
  const area = String(params.area);
  //const category = params.category;
  //const search = params.search;

  const currentPage = parseInt(params._id) || 1;
  const skipCount = ( currentPage - 1)   * 10;
  const pageCount = Math.ceil(Session.get('trainerCount') / 10);
  console.log('area: ' + area);

  const subscription = Meteor.subscribe('trainers.list.area', skipCount, parseInt(currentPage), area);
  if (subscription.ready()) {
    const trainers = Trainers.find().fetch(); // Converts MongoDB data into an array rather than cursor
    onData(null, { trainers, searchQuery, pageCount, currentPage, area });
  }
};

export default composeWithTracker(composer, Loading)(TrainersList); // The wrap of the containers
