import {Meteor} from 'meteor/meteor';
import {composeWithTracker} from 'react-komposer';
import Trainers from '../../api/trainers/trainers.js';
import TrainerExperienceEditor from '../pages/EditTrainerProfile';

import Loading from '../components/Loading.js';

/* Load Trainers Edit profile colleciton base off idUser
 *  @param, onData
 *  @return doc
 */
const composer = ({params}, onData) => {

  const subscription = Meteor.subscribe('trainers.edit');

  if (subscription.ready()) {
    const trainer = Trainers.find({"idUser": String(Meteor.userId())}).fetch();
    const doc = trainer[0];
    onData(null, { doc });
  }
};

export default composeWithTracker(composer, Loading)(TrainerExperienceEditor);
