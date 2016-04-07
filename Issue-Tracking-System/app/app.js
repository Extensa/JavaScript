'use strict';

angular.module('issueTrackingSystem', [
    'ngRoute',
    'issueTrackingSystem.home'
]).
config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/'});
}]);
