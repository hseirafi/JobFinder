/**
 * Created by hseirafi on 24/10/2014.
 */

var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird');
var jobsData = require('../../../jobs-data');

function resetJobs(){
    return new Promise(function(resolve, reject){
        mongoose.connection.collections['jobs'].drop(resolve, reject);
    });
}

// See the nested describes below?
// This allows us to have a single "before ane after" function (open and close connection) for both sets of sub-tests.

describe('jobs', function () {

    before(function (done) {
        jobsData.connectDb('mongodb://psdev:789456123@ds053130.mongolab.com:53130/jobfinder')
            .then(function () {
                done();
        });
    });

    after(function(){
        mongoose.connection.close();
    })

    describe('get jobs', function () {
        var jobList;

        before(function (done) {
            resetJobs()
            .then(jobsData.seedJobs)
            .then(jobsData.findJobs)
            .then(function (collection) {
                jobList = collection;
                done();
            });
        });

        it('should never return empty collection as jobs are seeded', function () {
            expect(jobList.length).to.be.at.least(1);
        });

        it("should have a description", function () {
            expect(jobList[0].description).to.not.be.empty;
        });

        it("should have a title", function () {
            expect(jobList[0].title).to.not.be.empty;
        });
    });

    var jobToSave = {title: "test title", description: "test description"};
    var jobList;
    describe('save jobs', function () {
        before(function (done) {
                resetJobs()
                .then(function(){return jobsData.saveJob(jobToSave);})
                .then(jobsData.findJobs)
                .then(function (collection) {
                    jobList = collection;
                    done();
                });
        });

        it('job re-read from db should match job saved', function () {
            var jobFromDb = jobList[0];
            expect(jobFromDb.title).to.equal(jobToSave.title);
            expect(jobFromDb.description).to.equal(jobToSave.description);
        });

        it("should result in exactly one item after saving one item", function () {
            // Note. in the test below, "length" is the name of the property we are checking against one.
            expect(jobList).to.have.length(1);
            // The example below is another way of doing the same...
            //expect(jobList.length).to.have.equal(1);
        });
    });
});