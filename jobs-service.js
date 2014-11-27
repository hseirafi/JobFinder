/**
 * Created by hseirafi on 03/11/2014.
 */
//var jobsData = require('./jobs-data');
var bodyParser = require('body-parser');    // used below to allow us to access the body as a property of the req(uest).

module.exports = function(db, app) {
    app.use(bodyParser.json());

    app.post('/api/jobs', function (req, res) {
        // look at mocha and inversion of control libs for node.
        db.saveJob(req.body);
        res.end();
    });

    app.get('/api/jobs', function(req, res) {
        db.findJobs().then(function(collection) {
            res.send(collection);
        });
    });

};