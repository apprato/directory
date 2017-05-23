import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Clients } from '../clients.js';

/* This is where you list all your publications */
Meteor.publish('clients.search', (searchTerm) => {
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

Meteor.publish('clients.view', (_id) => {
  check(_id, String);
  return Clients.find(_id);
});

Meteor.publish('clients.list', () => Clients.find());

