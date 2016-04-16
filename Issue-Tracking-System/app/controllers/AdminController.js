angular.module('issueTrackingSystem.adminCtrl', ['issueTrackingSystem.user'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin', {
            templateUrl: 'app/views/administration/adminPage.html',
            controller: 'AdminController'
        });
    }])
    .controller('AdminController', ['$scope', 'userSrv', 'notifySrv',
        
        function AdminController($scope, userSrv, notifySrv) {
            $scope.getAllUsers = function () {
                userSrv.getAllUsers()
                    .then(function (users) {
                        $scope.allUsers = users;
                    }, function (error) {
                        notifySrv.error(error.data);
                    });
            }
        }]);