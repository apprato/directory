import {SimpleSchema} from 'meteor/aldeed:simple-schema';
import {ValidatedMethod} from 'meteor/mdg:validated-method';
import Trainers from './trainers';
import rateLimit from '../../modules/rate-limit.js';


export const upsertTrainer = new ValidatedMethod({
  name: 'trainers.upsert',
  validate: new SimpleSchema({

    // experience form - part 2
    _id: {type: String, optional: true},
    category: {type: String, optional: true},
    skills: {type: [String], optional: true},
    experienceLevel: {type: String, optional: true},
    idUser: {type: String, optional: true},

    // profile form - part 3
    professionalTitle: {type: String, optional: true},
    overview: {type: String, optional: true},
    school: {type: String, optional: true},
    englishProficiency: {type: String, optional: true},
    dateFrom: {type: String, optional: true},
    dateTo: {type: String, optional: true},
    tertiaryEducation: {type: String, optional: true},
    areaOfStudy: {type: String, optional: true},
    description: {type: String, optional: true},

    company: {type: String, optional: true},
    location: {type: String, optional: true},
    title: {type: String, optional: true},
    fromMonth: {type: String, optional: true},
    fromYear: {type: String, optional: true},
    toMonth: {type: String, optional: true},
    toYear: {type: String, optional: true},
    //description: { type: String, optional: true },

    availability: {type: String, optional: true},
    hourlyRate: {type: String, optional: true},
    paidRate: {type: String, optional: true},
    address1: {type: String, optional: true},
    address2: {type: String, optional: true},
    city: {type: String, optional: true},
    country: {type: String, optional: true},
    postCode: {type: String, optional: true},
    phoneNumber: {type: String, optional: true}
  }).validator(),
  run(trainer) {
    var userFound;
    var userTrainer = Trainers.find({"idUser": String(Meteor.userId())}).fetch();

    userTrainer.every(function (elem) {
      if (typeof(elem) !== 'undefined') {
        userFound = true;
        return false;
      }
      return true;
    });

    if (typeof(userFound) !== 'undefined') {
      Trainers.update({idUser: Meteor.userId()}, {$set: trainer} );
      return true;
    }
    else {
      Trainers.upsert({_id: trainer._id}, {$set: trainer} );
      return false
    }
  },
});


export const upsertEducationTrainer = new ValidatedMethod({
  name: 'trainers.education.upsert',
  validate: new SimpleSchema({
    // Educational Modal (Array of objects)
    'education.$.school': {type: String, optional: true},
    'education.$.dateFrom': {type: String, optional: true},
    'education.$.dateTo': {type: String, optional: true},
    'education.$.title': {type: String, optional: true},
    'education.$.tertiaryEducation': {type: String, optional: true},
    'education.$.areaOfStudy': {type: String, optional: true},
    'education.$.description': {type: String, optional: true},
  }).validator(),
  run(trainer) {
    var userFound;
    var userTrainer = Trainers.find({"idUser": String(Meteor.userId())}).fetch();

    userTrainer.every(function (elem) {
      if (typeof(elem) !== 'undefined') {
        userFound = true;
        return false;
      }
      return true;
    });

    if (typeof(userFound) !== 'undefined') {
      Trainers.update({idUser: Meteor.userId()}, {$push: { education: trainer.education[0] } } );
      return true;
    }
    else {
      browserHistory.push(`/trainer/edit/experience`);
      return false;
    }
  },
});


export const upsertEmploymentTrainer = new ValidatedMethod({
  name: 'trainers.employment.upsert',
  validate: new SimpleSchema({
    // Educational Modal (Array of objects)
    'employment.$.company': {type: String, optional: true},
    'employment.$.location': {type: String, optional: true},
    'employment.$.title': {type: String, optional: true},
    'employment.$.fromMonth': {type: String, optional: true},
    'employment.$.fromYear': {type: String, optional: true},
    'employment.$.toMonth': {type: String, optional: true},
    'employment.$.toYear': {type: String, optional: true},
    'employment.$.description': {type: String, optional: true},
  }).validator(),
    run(trainer) {
    var userFound;
    var userTrainer = Trainers.find({"idUser": String(Meteor.userId())}).fetch();

    userTrainer.every(function (elem) {
      if (typeof(elem) !== 'undefined') {
        userFound = true;
        return false;
      }
      return true;
    });

    if (typeof(userFound) !== 'undefined') {
      Trainers.update({idUser: Meteor.userId()}, {$push: { employment: trainer.employment[0] } } );
      return true;
    }
    else {
      browserHistory.push(`/trainer/edit/experience`);
      return false;
    }
  },
});


export const removeTrainer = new ValidatedMethod({
  name: 'trainers.remove',
  validate: new SimpleSchema({
    _id: {type: String},
  }).validator(),
  run({_id}) {
    Trainers.remove(_id);
  },
});


export const removeTrainerEducation = new ValidatedMethod({
  name: 'trainers.education.remove',
  validate: new SimpleSchema({
    schoolToDelete: {type: String},
  }).validator(),
  run({schoolToDelete}) {
    Trainers.update( { "idUser" : String(Meteor.userId()) },
      {
        $pull :
          { "education" :
            { "school" : schoolToDelete }
          }
      });
  }
});


export const removeTrainerEmployment = new ValidatedMethod({
  name: 'trainers.employment.remove',
  validate: new SimpleSchema({
    companyToDelete: {type: String},
  }).validator(),
  run({companyToDelete}) {
    Trainers.update( { "idUser" : String(Meteor.userId()) },
    {
      $pull :
        { "employment" :
          { "company" : companyToDelete }
        }
    });
  }
});


rateLimit({
  methods: [
    upsertTrainer,
    upsertEducationTrainer,
    upsertEmploymentTrainer,
    removeTrainer,
    removeTrainerEducation,
    removeTrainerEmployment
  ],
  limit: 5,
  timeRange: 1000,
});
