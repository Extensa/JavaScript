angular.module('issueTrackingSystem.issuesCtrl', ['issueTrackingSystem.issues'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/dashboard/dashboard.html',
            controller: 'IssuesController'
        })
    }])
    .controller('IssuesController', ['$scope', 'issuesSrv', 'notifySrv', 'authenticationSrv', 'PAGE_SIZE',
        function ($scope, issuesSrv, notifySrv, authenticationSrv, PAGE_SIZE) {
            $scope.issuesParams = {
                currentPage: 1,
                pageSize: PAGE_SIZE
            };
            
            $scope.getUserIssues = function () {
                    issuesSrv.getUserIssues($scope.issuesParams)
                        .then(function (success) {
                            $scope.issues = success.Issues;
                            $scope.issuesCount = success.TotalPages * $scope.issuesParams.pageSize;
                            console.log(success);
                        }, function (error) {
                            console.log(error);
                        })

            };

            $scope.$watch(authenticationSrv.isLogged, function (newValue, oldValue) {
                if (newValue) {
                    $scope.getUserIssues();
                }
            });


            $scope.isLoggedIn = authenticationSrv.isLogged;
    }]);