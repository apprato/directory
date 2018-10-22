import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Trainers from '../../api/trainers/trainers.js';
import TrainersList from '../components/TrainersList.js';
import Loading from '../components/Loading.js';

// Reactive Vars
const searchQuery = new ReactiveVar(null);
const categoryQuery = new ReactiveVar(null);
const stateQuery = new ReactiveVar(null);

const TrainersListContainer = createContainer((props, params) => {

    // Params
    const currentPage = parseInt(props.params._id) || 1;

    // ReactiveVars
    const search = searchQuery.get();
    const category = categoryQuery.get();
    const state = stateQuery.get();

    // Vars
    const trainersPerPage = 10;
    const skipCount = (currentPage - 1) * trainersPerPage;
    const pageCount = Math.ceil(Session.get('trainerCount') / trainersPerPage);

    // Get Listing total count (/directory, /directory/category, /directory/category/search
    Meteor.apply('getTrainersCountList', [skipCount, search, category, state, trainersPerPage], true, function (err, result) {
        Session.set('trainerCount', result);
    });

    var subscription = Meteor.subscribe('trainers.list.filter', skipCount, search, category, state, trainersPerPage);
    const trainers = Trainers.find().fetch(); // Converts MongoDB data into an array rather than cursor

    return {
        subscription,
        trainers,
        searchQuery,
        categoryQuery,
        stateQuery,
        pageCount,
        currentPage,
        Loading
    };
}, TrainersList);

// Finally, export the Container
export default TrainersListContainer;