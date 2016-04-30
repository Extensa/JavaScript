'use strict';

angular.module('issueTrackingSystem', [
        'ngRoute',
        'ngCookies',
        'ui.bootstrap.pagination',
        'issueTrackingSystem.notify',
        'issueTrackingSystem.authentication',
        'issueTrackingSystem.authenticationCtrl',
        'issueTrackingSystem.adminCtrl',
        'issueTrackingSystem.projectsCtrl',
        'issueTrackingSystem.issuesCtrl'
    ])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')
    .constant('PAGE_SIZE', 6)
    
    .run(function ($rootScope, $location, authenticationSrv) {
        $rootScope.$on('$routeChangeStart', function (event, next) {
            if (next.requiresLogin && !authenticationSrv.isLogged()) {
                $location.path('/login');
            }

            if (!next.requiresLogin && authenticationSrv.isLogged()) {
                $location.path('/');
            }

            if (next.requiresAdmin && !authenticationSrv.isAdmin()) {
                $location.path('/');
            }
        })
    });
