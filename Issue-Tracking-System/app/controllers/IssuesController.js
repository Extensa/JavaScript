angular.module('issueTrackingSystem.issuesCtrl', ['issueTrackingSystem.issues', 'issueTrackingSystem.project', 'issueTrackingSystem.user'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/dashboard/dashboard.html',
            controller: 'IssuesController'
        });
        $routeProvider.when('/issues/:id', {
            templateUrl: 'app/views/issues/issueDetails.html',
            controller: 'IssueDetailsController',
            requiresLogin: true
        });
        $routeProvider.when('/issues/:id/edit', {
            templateUrl: 'app/views/issues/editIssue.html',
            controller: 'EditIssueController',
            requiresLogin: true
        });
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
    .controller('IssueDetailsController', ['$scope', '$routeParams','issuesSrv', 'authenticationSrv', 'notifySrv', 'projectSrv',
        function IssueDetailsController($scope, $routeParams,issuesSrv, authenticationSrv, notifySrv, projectSrv) {
            $scope.userId = authenticationSrv.getUserId();

            $scope.getIssue = function () {
                issuesSrv.getIssue($routeParams.id)
                    .then(function (success) {
                        $scope.issueDetails = success;
                        console.log($scope.issueDetails);

                        projectSrv.getProject(success.Project.Id)
                            .then(function (success) {
                                $scope.canEdit =
                                    success.Lead.Id === $scope.userId ||
                                    success.Assignee.Id === $scope.userId;
                            }, function (error) {
                                notifySrv.error('Failed getting the project for the issue!');
                            });
                    }, function (error) {
                        notifySrv.error('Failed getting the issue!')
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
    }])
    .controller('EditIssueController', ['$scope', '$routeParams', '$location','issuesSrv', 'projectSrv', 'userSrv', 'notifySrv',
        function EditIssueController($scope, $routeParams, $location,issuesSrv, projectSrv,userSrv, notifySrv) {
            $scope.issue = issuesSrv.getLastLoadedIssue();
            $scope.project = projectSrv.getLastLoadedProject();
            
            userSrv.getAllUsers()
                .then(function (success) {
                    $scope.users = success.sort(function (a, b) {
                        return a.Username.localeCompare(b.Username);
                    })

                });

            $scope.editIssue = function () {
                issuesSrv.editIssue({
                    Id: $scope.issue.Id,
                    Title: $scope.issue.Title,
                    Description: $scope.issue.Description,
                    DueDate: $scope.issue.DueDate,
                    AssigneeId: $scope.issue.Assignee.Id,
                    PriorityId: $scope.issue.Priority.Id,
                    Labels: $scope.issue.Labels
                }).then(function (success) {
                    notifySrv.success('Edited successfully!');
                    $location.path('/issues/' + $scope.issue.Id);
                })
            }
    }]);