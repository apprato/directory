import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Trainers from '../trainers';

Meteor.publish('trainers.list', () => Trainers.find());
Meteor.publish('trainers.edit', () => Trainers.find());
Meteor.publish('trainers.edit.experience', () => Trainers.find());
Meteor.publish('trainers.list.education', () => Trainers.find());
Meteor.publish('trainers.list.employment', () => Trainers.find());
Meteor.publish('trainers.view', (_id) => {
  check(_id, String);
  return Trainers.find(_id);
});
