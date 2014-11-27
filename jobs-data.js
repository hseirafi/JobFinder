/**
 * Created by hseirafi on 31/10/2014.
 */
var mongoose = require('mongoose');
require('./models/Job');
var Promise = require('bluebird');

var Job = mongoose.model('Job');

var findJobs = function(query) {
    return Promise.cast(Job.find(query).exec());
};

exports.findJobs = findJobs;

//exports.saveJob = function(jobToSave){
//    return new Promise(function(resolve, reject){
//        createJob(jobToSave)
//            .then(function(){
//                resolve(jobToSave);
//            });
//    });
//};

var createJob = Promise.promisify(Job.create, Job);
exports.saveJob = createJob;

exports.connectDb = Promise.promisify(mongoose.connect, mongoose);

exports.seedJobs = function(){
    return findJobs({})
        .then(function(collection){
            if (collection.length == 0){
                return Promise.map(seedJobs, function(job){
                    return createJob(job);
                })
            }
        })
};


var seedJobs = [
    {title:'Cook', description:'Cooking up some splendid stuff'},
    {title:'Technical Architect', description:'The technical architect of the team...'},
    {title:'Scrum Master', description:'What did you do yesterday?  What you gonna do today?  Whats stopping progress?'},
    {title:'Performance Analyst', description:'Lets help the Service Manager build and amazing service for our citizens!'}
];