/**
 * Created by hseirafi on 03/11/2014.
 */
describe("posting jobs", function(){
    var postRequestJob;
    var newJob = {title: "test title", description: "test description"};

    // Before each test, load the "app" module
    beforeEach(module('app'));

    it("should call /api/jobs with the job data", inject(function($httpBackend, jobs){

        // Using angular-mocks setup a mock handler for the angular $httpBackend for use with the job service (see jobs.save below)
        $httpBackend.whenPOST('/api/jobs', function (data) {
            postRequestJob = JSON.parse(data);
            expect(postRequestJob).to.not.be.empty;
            return true;
        }).respond(200);

        // Jobs is injected in above and is an angular service (/public/app/jobs/js) which returns a angular-resource pinned against '/api/jobs'
        // When we call 'save' we are causing the returned angular-resource to do a POST to /public/app/jobs/js, which causes the above whenPOST to kick in
        jobs.save(newJob);
        $httpBackend.flush();
    }));
});