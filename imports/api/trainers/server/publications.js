import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import Trainers from "../trainers";
import { publishCount } from "meteor/fuww:publish-count";

Meteor.publish("trainers.list", (skipCount, _id) => {
  check(skipCount, Number);
  check(_id, Number);

  const query = {};
  const trainersTotal = Trainers.find().count();
  var trainersQuery = Trainers.find(query, {
    limit: 10,
    skip: skipCount
  });

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
Meteor.publish(
  "trainers.list.filter",
  (skipCount, _search, _category, _state, trainersPerPage) => {
    check(skipCount, Match.Maybe(Number, null, undefined));
    check(_search, Match.Maybe(String, null, undefined));
    check(_state, Match.Maybe(String, null, undefined));
    check(_category, Match.Maybe(String, null, undefined));
    check(trainersPerPage, Match.Maybe(Number, null, undefined));
    console.log('_category: ' + _category);
    console.log('_state: ' + _state);
    console.log('_search: ' + _search);

    // Only add to $and if it has been selected
    if (_category && _state === null && _search === null) {
      var query = {
        $and: [
          {
            category: _category
          },
        ]
      };
    }
    else if (_category === null && _state && _search === null) {
      var query = {
        $and: [
          {
            state: _state
          },
        ]
      };
    }
    else if (_category && _state && _search === null) {
      var query = {
        $and: [
          {
            category: _category,
            state: _state
          },
        ]
      };
    }
    else {
      var query = {};
    }

    console.log(query);
    const sort = { score: { $meta: "textScore" } };
    var trainersQuery = Trainers.find(
      query,
      {
        limit: trainersPerPage,
        skip: skipCount
      },
      { score: { $meta: "textScore" } }
      //sort
    );

    return trainersQuery;

    // Search
    /*
    else if (_search) {
      const regex = new RegExp(_search, "i"); // i is case insensitive
      const query = {
        $text: {
          $search: _search
        }
      };
      // query, projection
      var trainersQuery = Trainers.find(query, {
        limit: trainersPerPage,
        skip: skipCount
      });

    } else {
      const query = {};
      const sort = { score: { $meta: "textScore" } };
      var trainersQuery = Trainers.find(
        query,
        {
          limit: trainersPerPage,
          skip: skipCount
        },
        { score: { $meta: "textScore" } }
        //sort
      );
    }
    */

  }
);

Meteor.publish("trainers.list.area", (skipCount, _id, area) => {
  check(area, String);
  check(skipCount, Number);
  check(_id, Number);

  const query = {
    $and: [
      {
        state: area.toUpperCase()
      }
    ]
  };
  // query, projection
  const trainersTotal = Trainers.find().count();
  var trainersQuery = Trainers.find(query, {
    limit: 10,
    skip: skipCount
  });

  return trainersQuery;
});

Meteor.publish("trainers.edit", () => Trainers.find());
Meteor.publish("trainers.edit.experience", () => Trainers.find());
Meteor.publish("trainers.list.education", () => Trainers.find());
Meteor.publish("trainers.list.employment", () => Trainers.find());
Meteor.publish("trainers.view", _id => {
  check(_id, String);
  return Trainers.find(_id);
});

Meteor.publish("trainers.search", searchTerm => {
  check(searchTerm, Match.OneOf(String, null, undefined));

  let query = {};
  const projection = { limit: 10, sort: { title: 1 } };

  if (searchTerm) {
    const regex = new RegExp(searchTerm, "i");

    query = {
      $or: [
        { title: regex },
        { year: regex },
        { rated: regex },
        { plot: regex }
      ]
    };

    projection.limit = 100;
  }

  return Clients.find(query, projection);
});
