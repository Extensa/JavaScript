angular.module('issueTrackingSystem.authenticationCtrl', ['issueTrackingSystem.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'app/views/home/login.html',
            controller: 'AuthenticationController',
            requiresLogin: false
        });
        $routeProvider.when('/register', {
            templateUrl: 'app/views/home/register.html',
            controller: 'AuthenticationController',
            requiresLogin: false
        });
        $routeProvider.when('/profile/password', {
            templateUrl: 'app/views/home/changePassword.html',
            controller: 'AuthenticationController',
            requiresLogin: true
        });
    }])
    .controller('AuthenticationController', ['$scope', '$location','authenticationSrv', 'notifySrv',
        function AuthenticationController($scope, $location, authenticationSrv, notifySrv) {
            $scope.login = function (userData) {

                authenticationSrv.login(userData)
                    .then(function (success) {
                        $location.path('/');
                        notifySrv.success('Welcome aboard!!');
                    }, function (error) {
                        notifySrv.error(error.error_description);
                    });
            };

            $scope.logout = function () {
                authenticationSrv.logout()
                    .then(function () {
                        notifySrv.success('You logged out successfully!');
                    }, function (error) {
                        notifySrv.error(error.error_description);
                    });
            };
            
            $scope.register = function (userData) {
                authenticationSrv.register(userData)
                    .then(function () {
                        $scope.login({
                            username: userData.email,
                            password: userData.password
                        });
                    }, function (error) {
                        notifySrv.error('The password and confirmation password do not match.');
                    });
            };

            $scope.changePass = function (userData) {
                authenticationSrv.changePass(userData)
                    .then(function () {
                        notifySrv.success('Password changed successfully!');
                        $location.path('/');
                    }, function (error) {
                        notifySrv.error('Failed to change the password!');
                    })
            };

            $scope.isLoggedIn = authenticationSrv.isLogged;

            $scope.isAdmin = authenticationSrv.isAdmin;
}]);