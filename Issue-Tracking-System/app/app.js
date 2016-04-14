'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngCookies',
        'issueTrackingSystem.authenticationCtrl'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/api/');
