import { composeWithTracker } from 'react-komposer';
import { Meteor } from 'meteor/meteor';
import Trainers  from '../../api/trainers/trainers.js';
import TrainersList from '../components/TrainersList.js';
import Loading from '../components/Loading.js';

const searchQuery = new ReactiveVar(null);

const composer = ({ params }, onData) => {

  // Fliters
  const trainersPerPage = 3;
  const currentPage = parseInt(params._id) || 1;
  const skipCount = ( currentPage - 1)   * trainersPerPage;
  const pageCount = Math.ceil(Session.get('trainerCount') / trainersPerPage);
  const category = params._category;
  const search = params._search;

  // Get jobs total count (/directory, /directory/category, /directory/category/search
  Meteor.apply('getTrainersCountList',[skipCount, search, category, trainersPerPage],true,function(err,result){
    Session.set('trainerCount', result);
  });
  var subscription = Meteor.subscribe('trainers.list.filter', skipCount, search, params._category, trainersPerPage);

  if (subscription.ready()) {
    const trainers = Trainers.find().fetch(); // Converts MongoDB data into an array rather than cursor
    onData(null, { trainers, searchQuery, pageCount, currentPage });
  }
};

export default composeWithTracker(composer, Loading)(TrainersList); // The wrap of the containers
