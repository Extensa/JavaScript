angular.module('issueTrackingSystem.issuesCtrl', [])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/dashboard/dashboard.html',
            controller: 'IssuesController'
        });
    }])
    .controller('IssuesController', ['$scope',
        function IssuesController($scope) {
        
    }]);