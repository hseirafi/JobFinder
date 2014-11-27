/**
 * Created by hseirafi on 03/11/2014.
 */

app.factory('jobs', ['$resource', function($resource){
    return $resource('/api/jobs/');
}]);