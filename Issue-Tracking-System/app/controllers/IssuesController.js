angular.module('issueTrackingSystem.issuesCtrl', ['issueTrackingSystem.issues'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/dashboard/dashboard.html',
            controller: 'IssuesController'
        });
        $routeProvider.when('/issues/:id', {
            templateUrl: 'app/views/issues/issueDetails.html',
            controller: 'IssueDetailsController',
            requiresLogin: true
        })
    }])
    .controller('IssuesController', ['$scope', 'issuesSrv', 'notifySrv', 'authenticationSrv', 'PAGE_SIZE',
        function IssuesController($scope, issuesSrv, notifySrv, authenticationSrv, PAGE_SIZE) {
            $scope.issuesParams = {
                currentPage: 1,
                pageSize: PAGE_SIZE
            };
            
            $scope.getUserIssues = function () {
                issuesSrv.getUserIssues($scope.issuesParams)
                    .then(function (success) {
                        $scope.issues = success.Issues;
                        $scope.issuesCount = success.TotalPages * $scope.issuesParams.pageSize;
                    }, function (error) {
                        console.log(error);
                    })
            };

            if ($scope.isLoggedIn()) {
                $scope.getUserIssues();
            }
            
            $scope.isLoggedIn = authenticationSrv.isLogged;
    }])
    .controller('IssueDetailsController', ['$scope', '$routeParams','issuesSrv', 'authenticationSrv', 'notifySrv',
        function IssueDetailsController($scope, $routeParams,issuesSrv, authenticationSrv, notifySrv) {
            $scope.getIssue = function () {
                issuesSrv.getIssue($routeParams.id)
                    .then(function (success) {
                        $scope.issueDetails = success;
                        console.log($scope.issueDetails);
                    }, function (error) {
                        notifySrv.error('Couldn\'t get the issue!')
                    });
            };

            $scope.changeIssueStatus = function (statusId, updatedStatusName) {
                issuesSrv.changeIssueStatus($routeParams.id, statusId)
                    .then(function (success) {
                        $scope.issueDetails.AvailableStatuses = success;
                        $scope.issueDetails.Status.Name = updatedStatusName;
                    }, function (error) {
                        notifySrv.error('Failed to update the issue status!');
                    });
            };

            $scope.getIssue();

            $scope.userId = authenticationSrv.getUserId();
    }]);