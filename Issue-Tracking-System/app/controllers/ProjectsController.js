angular.module('issueTrackingSystem.projectsCtrl', ['issueTrackingSystem.project', 'issueTrackingSystem.user'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/projects/add',{
            templateUrl: 'app/views/project/addProject.html',
            controller: 'ProjectsController',
            requiresLogin: true,
            requiresAdmin: true
        });
        $routeProvider.when('/projects/:id',{
            templateUrl: 'app/views/project/projectDetails.html',
            controller: 'ProjectDetailsController',
            requiresLogin: true
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
                        console.log(success);
                        notifySrv.success(success.Name + 'successfully created a project!');
                        $scope.newProject = {};
                    }, function (error) {
                        console.log(error);
                    })
            }
    }])
    .controller('ProjectDetailsController', ['$scope', '$routeParams','projectSrv', 'userSrv',
        function ProjectDetailsController($scope, $routeParams, projectSrv, userSrv) {
            projectSrv.getProject($routeParams.id)
                .then(function (success) {
                    $scope.project = success;
                    console.log(success);
                });
    }]);