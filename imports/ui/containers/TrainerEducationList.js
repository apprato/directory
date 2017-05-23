import {Meteor} from 'meteor/meteor';
import {composeWithTracker} from 'react-komposer';
import Trainers from '../../api/trainers/trainers.js';
import TrainerEducationList from '../components/TrainerEducationList.js';

import Loading from '../components/Loading.js';

/* Load Trainers Edit profile colleciton base off idUser
 *  @param, onData
 *  @return doc
 */
const composer = ({params}, onData) => {

  const subscription = Meteor.subscribe('trainers.list.education');

  if (subscription.ready()) {
    const document = Trainers.find( {
      $and:
        [
          { "idUser": String(Meteor.userId()) },
          { education: { $exists: true } }
        ]
    }).fetch();
    var trainerEducation = document[0];
    if (trainerEducation == null) {
      onData(null, {document});
    }
    else {
      const doc = trainerEducation.education;
      onData(null, {doc});
    }
  }
};

export default composeWithTracker(composer, Loading)(TrainerEducationList);
