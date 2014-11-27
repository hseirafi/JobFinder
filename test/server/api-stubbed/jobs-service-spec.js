/**
 * Created by hseirafi on 03/11/2014.
 */
var express = require('express');
var app = express();

var Promise = require('bluebird');
var expect = require('chai').expect;
var request = require('supertest');


// Use to add a new route (post /api/jobs) to express (passed in to constructor) - internally, it uses a data access layer (db) - with a stub used below to support this test.
//    Stub of DB accessor function which is used by the jobService to save a job (this sets a local test variable to the value passed in, which is then verified)
//    We then use constructor injection to pass in the stub (db) to the new jobService
var dataSavedJob;
var stubJobs = [
    {title:'Cook', description:'Cooking up some splendid stuff'},
    {title:'Technical Architect', description:'The technical architect of the team...'},
    {title:'Scrum Master', description:'What did you do yesterday?  What you gonna do today?  Whats stopping progress?'},
    {title:'Performance Analyst', description:'Lets help the Service Manager build and amazing service for our citizens!'}
];
var db = {
    saveJob: function(job){
        dataSavedJob = job;
    },
    findJobs: function(){
        return new Promise(function (resolve, reject) {
            resolve(stubJobs);
        });
    }
};
require('../../../jobs-service')(db, app);       // This adds the route to express, passing in our local express (app) and our stub DAL (db)

describe("save jobs", function(){
    it("should validate that title is greater than 4 characters");
    it("should validate that title is less than 40 characters");
    it("should validate that description is greater than 4 characters");
    it("should validate that description is less than 200 characters");

    var newJob = {title:'Technical Architect', description:'The technical architect of the team...'};
    it("should pass job to the database", function(done){
        request(app).post('/api/jobs').send(newJob).end(function(err, res){
            expect(dataSavedJob).to.deep.equal(newJob);     // deep.equal is used to check ALL attributes of the objects which match in one go.
            done();
        });
    });
    it("should return a status of 200 if the job saved successfully");
    it("should return a job with an ID if the job saved successfully");
    it("should return an error if the job save failed");
});

describe("get jobs", function(){
    it("should return all rows when no filter", function(done){
        request(app).get('/api/jobs').end(function(err, res){
            expect(res.body).to.deep.equal(stubJobs);     // deep.equal can be used to check all items in the collections (comparing properties which exist in both)
            done();
        });
    });
    it("should return a status of 200 if retrieve worked");
});