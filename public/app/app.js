/**
 * Created by hseirafi on 24/10/2014.
 */

app = angular.module('app', ['ngResource']);

angular.module('app').controller('testCtrl', function($scope, $resource, jobs){
    $scope.jobs = $resource('/api/jobs').query();

    $scope.submit=function(){
        var newJob = {title: $scope.title, description: $scope.description};
        jobs.save(newJob);
        $scope.jobs.push(newJob);
    }
});