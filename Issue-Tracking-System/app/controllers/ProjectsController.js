angular.module('issueTrackingSystem.projectsCtrl', ['issueTrackingSystem.project', 'issueTrackingSystem.user'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/add',{
            templateUrl: 'app/views/project/addProject.html',
            controller: 'ProjectsController',
            requiresLogin: true,
            requiresAdmin: true
        });
    }])
    .controller('ProjectsController', ['$scope', '$location', 'projectSrv', 'userSrv', 'notifySrv',
        function ProjectsController($scope, $location, projectSrv, userSrv, notifySrv) {
            userSrv.getAllUsers()
                .then(function (success) {
                    $scope.users = success.sort(function (a, b) {
                        return a.Username.localeCompare(b.Username);
                    })

                });

            $scope.addProject = function (projectData) {
                var priorities = [];

                projectData.priorities.split(", ").forEach(function (a) {
                    priorities.push({ Name: a });
                });

                projectData.priorities = priorities;
                
                projectSrv.addProject(projectData)
                    .then(function (success) {
                        notifySrv.success('Successfully created a project!');
                        $scope.newProject = {};
                    }, function (error) {
                        console.log(error);
                    })
            }
    }]);