import { Meteor } from 'meteor/meteor';
import React from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import Trainers from '../../api/trainers/trainers.js';
import TrainersList from '../components/TrainersList.js';
import Loading from '../components/Loading.js';
const searchQuery = new ReactiveVar(null);
const categoryQuery = new ReactiveVar(null);

const TrainersListContainer = createContainer((props, params) => {

    // Get jobs total count (/directory, /directory/category, /directory/category/search
    Meteor.apply('getTrainersCountList', [skipCount, search, category, trainersPerPage], true, function (err, result) {
        Session.set('trainerCount', result);
    });

    // Params
    const currentPage = parseInt(props.params._id) || 1;
    const skipCount = (currentPage - 1) * 5;

    // ReactiveVars
    const search = searchQuery.get();
    const category = categoryQuery.get();

    // Vars
    const trainersPerPage = 10;

    var subscription = Meteor.subscribe('trainers.list.filter', skipCount, search, category, trainersPerPage);
    const trainers = Trainers.find().fetch(); // Converts MongoDB data into an array rather than cursor

    return {
        subscription,
        trainers,
        searchQuery,
        categoryQuery,
        Loading
    };
}, TrainersList);

// Finally, export the Container
export default TrainersListContainer;