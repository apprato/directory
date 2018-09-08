import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import Trainers from '../trainers';
import {publishCount} from 'meteor/fuww:publish-count';


Meteor.publish('trainers.list', (skipCount, _id) => {

  check(skipCount, Number);
  check(_id, Number);

  const query = {};
  const trainersTotal = Trainers.find().count();
  var trainersQuery = Trainers.find(
    query,
    {
      limit: 10,
      skip: skipCount,
    }
  );

  return trainersQuery;
});


/*
 * Directory (Trainers Page) - directory/*, directory/search/*, directory/category/&
 *
 * @param skipCount
 * @param _search
 * @param _category
 * @param trainersPerPage
 * @return trainersQuery
 */
Meteor.publish('trainers.list.filter', (skipCount, _search, _category, trainersPerPage) => {

  check(skipCount, Match.Maybe(Number, null, undefined));
  check(_search, Match.Maybe(String, null, undefined));
  check(_category, Match.Maybe(String, null, undefined));
  check(trainersPerPage, Match.Maybe(Number, null, undefined));

  if (_category) {
    const query = {
      $and: [
        {
          category: _category
        },
      ],
    };
    // query, projection
    var trainersQuery = Trainers.find(
      {
        category: _category
      },
      {
        limit: trainersPerPage,
        skip: skipCount,
      }
    );
  }
  else if (_search) {
    const regex = new RegExp(_search, 'i');
    const query = {
      $or: [
        {businessName: regex},
        {overview: regex},
        {address1: regex},
        {address2: regex},
        {city: regex},
        {state: regex},
        {suburb: regex},
        {postCode: regex},
        {website: regex},
        {email1: regex},
        {email2: regex}
      ],
    };
    // query, projection
    var trainersQuery = Trainers.find(
      query,
      {
        limit: trainersPerPage,
        skip: skipCount,
      }
    );
  }
  else {
    const query = {};
    var trainersQuery = Trainers.find(
      query,
      {
        limit: trainersPerPage,
        skip: skipCount,
      }
    );
  }

  return trainersQuery;

});



Meteor.publish('trainers.list.area', (skipCount, _id, area) => {

  check(area, String);
  check(skipCount, Number);
  check(_id, Number);

  const query = {
    $and: [
      {
        state: area.toUpperCase()
      },
    ],
  };
  // query, projection
  const trainersTotal = Trainers.find().count();
  var trainersQuery = Trainers.find(
    query,
    {
      limit: 10,
      skip: skipCount,
    }
  );

  return trainersQuery;

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
