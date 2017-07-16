import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Trainers from '../trainers';
import {publishCount} from 'meteor/fuww:publish-count';

Meteor.publish('trainers.list', (skipCount, _id) => {

  check(skipCount, Number);
  check(_id, Number);

  const query = {};

  const trainersTotal = Trainers.find().count();
  var trainersQuery = Trainers.find({},
    {
      //fields: ,
      limit: 10,
      skip: skipCount,
    }
  );
  console.log('skipCount: ' + skipCount);

  return trainersQuery;




  /*
  const trainers = Trainers.find();
  publishCount(
    this, // publication context
    trainers, // cursor
    {
      ready: true, // should call this.ready()? (default: false)
      strategy: 'poll', // or 'observe' (default: 'observe')
      interval: 5000 // polling interval in ms (default: 1000)
    }
  );


  return trainersQuery;
  return [ trainersQuery, 33223 ];
  return [
    trainersQuery,
    trainersTotal
  ]
  */
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
  const projection = {limit: 10, sort: {title: 1}};

  if (searchTerm) {
    const regex = new RegExp(searchTerm, 'i');

    query = {
      $or: [
        {title: regex},
        {year: regex},
        {rated: regex},
        {plot: regex},
      ],
    };

    projection.limit = 100;
  }

  return Clients.find(query, projection);
});

