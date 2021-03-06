angular.module('issueTrackingSystem.adminCtrl', ['issueTrackingSystem.user'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'app/views/administration/adminPage.html',
            controller: 'AdminController',
            requiresLogin: true,
            requiresAdmin: true
        });
    }])
    .controller('AdminController', ['$scope', 'userSrv', 'notifySrv',
        function AdminController($scope, userSrv, notifySrv) {
            $scope.showUsers = false;

            $scope.getAllUsers = function () {
                userSrv.getAllUsers()
                    .then(function (users) {
                        $scope.allUsers = users;
                    }, function (error) {
                        notifySrv.error(error.data);
                    });
            };
            
            $scope.makeAdmin = function (id) {
                userSrv.makeAdmin(id)
                    .then(function () {
                        notifySrv.success('The user is now an admin!');
                    }, function (error) {
                        notifySrv.error(error);
                    });
            };
        }]);