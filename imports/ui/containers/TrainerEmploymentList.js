
import {Meteor} from 'meteor/meteor';
import {composeWithTracker} from 'react-komposer';
import Trainers from '../../api/trainers/trainers.js';
import TrainerEmploymentList from '../components/TrainerEmploymentList.js';

import Loading from '../components/Loading.js';

/* Load Trainers Edit profile colleciton base off idUser
 *  @param, onData
 *  @return doc
 */
const composer = ({params}, onData) => {

  const subscription = Meteor.subscribe('trainers.list.employment');

  if (subscription.ready()) {
    const document = Trainers.find( {
      $and:
        [
          { "idUser": String(Meteor.userId()) },
          { employment: { $exists: true } }
        ]
    }).fetch();
    var trainerEmployment= document[0];
    if (trainerEmployment== null) {
      onData(null, {document});
    }
    else {
      const doc = trainerEmployment.employment;
      onData(null, {doc});
    }
  }
};

export default composeWithTracker(composer, Loading)(TrainerEmploymentList);
