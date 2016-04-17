'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngCookies',
        'issueTrackingSystem.notify',
        'issueTrackingSystem.authenticationCtrl',
        'issueTrackingSystem.adminCtrl'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .run(function ($rootScope, $location, authenticationSrv) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.requiresLogin && !authenticationSrv.isLogged()) {
                $location.path('/login');
            }

            if (next.requiresAdmin && !authenticationSrv.isAdmin()) {
                $location.path('/');
            }
        })
    });
