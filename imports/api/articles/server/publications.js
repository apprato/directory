import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Articles from '../articles';

Meteor.publish('articles.list', () => Articles.find());

Meteor.publish('articles.view', (_id) => {
  check(_id, String);
  return Articles.find(_id);
});
