import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Trainers from '../trainers';

Meteor.publish('trainers.list', (_id) => {

  //Trainers.publish(this, 'TodoCount', Trainers.find(query));
  const query = {};
  Trainers.find(query);
  console.log(_id);

  return Trainers.find(query, {
    //fields: ,
    skip: _id,
    limit: 10
  });
});

Meteor.publish('trainers.edit', () => Trainers.find());
Meteor.publish('trainers.edit.experience', () => Trainers.find());
Meteor.publish('trainers.list.education', () => Trainers.find());
Meteor.publish('trainers.list.employment', () => Trainers.find());
Meteor.publish('trainers.view', (_id) => {
  check(_id, String);
  return Trainers.find(_id);
});

Meteor.publish('trainers.search', (searchTerm) => {
  check(searchTerm, Match.OneOf(String, null, undefined));

  let query = {};
  const projection = { limit: 10, sort: { title: 1 } };

  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');

    query = {
      $or: [
        { title: regex },
        { year: regex },
        { rated: regex },
        { plot: regex },
      ],
    };

    projection.limit = 100;
  }

  return Clients.find(query, projection);
});

