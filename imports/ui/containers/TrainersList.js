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
const suburbQuery = new ReactiveVar(null);
const pageCountQuery = new ReactiveVar(null);
const currentPageQuery = new ReactiveVar(null);

const TrainersListContainer = createContainer((props, params) => {

    // Params
    var currentPage = currentPageQuery.get();
    currentPage = parseInt(props.params._id) || 1;

    // ReactiveVars
    const search = searchQuery.get();
    const category = categoryQuery.get();
    const state = stateQuery.get();
    const suburb = suburbQuery.get();

    // Vars
    const trainersPerPage = 10;
    const skipCount = (currentPage - 1) * trainersPerPage;

    // Get Listing total count (/directory, /directory/category, /directory/category/search
    Meteor.apply('getTrainersCountList', [skipCount, search, category, state, suburb, trainersPerPage], true, function (err, result) {
        Session.set('trainerCount', result);
    });

    var pageCount = pageCountQuery.get();
    pageCount = Math.ceil(Session.get('trainerCount') / trainersPerPage);

    var subscription = Meteor.subscribe('trainers.list.filter', skipCount, search, category, state, suburb, trainersPerPage);
    const trainers = Trainers.find().fetch(); // Converts MongoDB data into an array rather than cursor

    return {
        subscription,
        trainers,
        searchQuery,
        categoryQuery,
        stateQuery,
        suburbQuery,
        pageCount,
        currentPage,
        Loading,
    };
}, TrainersList);

// Finally, export the Container
export default TrainersListContainer;