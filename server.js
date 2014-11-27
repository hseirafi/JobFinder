/**
 * Created by hseirafi on 24/10/2014.
 */
var express = require('express');
var app = express();

require('./models/Job');     // Mongoose model, we dont need the return, this script just registers the model with mongoose...
var jobsData = require('./jobs-data');

// This adds the api route to express, passing in our Data Access layer (jobsData) express app (app)
// No need to capture the return value as it just inerts routes in the express app.
require('./jobs-service')(jobsData, app);

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
    res.render('index');
})

jobsData.connectDb('mongodb://psdev:789456123@ds053130.mongolab.com:53130/jobfinder')
    .then(function(){
        console.log('Connected to MongoDB ok');
        jobsData.seedJobs();
    });

 //app.listen(process.env.PORT || 3001);
app.listen(process.env.PORT, process.env.IP);