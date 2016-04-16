angular.module('issueTrackingSystem.authenticationCtrl', 
    ['issueTrackingSystem.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'app/views/home/login.html',
            controller: 'AuthenticationController'
        });
        $routeProvider.when('/register', {
            templateUrl: 'app/views/home/register.html',
            controller: 'AuthenticationController'
        });
        $routeProvider.when('/profile/password', {
            templateUrl: 'app/views/home/changePassword.html',
            controller: 'AuthenticationController'
        });
    }])
    .controller('AuthenticationController', ['$scope', '$location','authentication', 'notify',
        function AuthenticationController($scope, $location, authentication, notify) {
            $scope.login = function (userData) {

                authentication.login(userData)
                    .then(function (success) {
                        $location.path('/');
                        notify.success('Welcome aboard!!');
                    }, function (error) {
                        notify.error(error.error_description);
                    });
            };

            $scope.logout = function () {
                authentication.logout()
                    .then(function () {
                        notify.success('You logged out successfully!');
                    }, function (error) {
                        notify.error(error.error_description);
                    });
            };
            
            $scope.register = function (userData) {
                authentication.register(userData)
                    .then(function () {
                        $scope.login({
                            username: userData.email,
                            password: userData.password
                        });
                    }, function (error) {
                        notify.error('The password and confirmation password do not match.');
                    });
            };

            $scope.changePass = function (userData) {
                authentication.changePass(userData)
                    .then(function () {
                        notify.success('Password changed successfully!');
                        $location.path('/');
                    }, function (error) {
                        notify.error('Failed to change the password!');
                    })
            };

            $scope.isLoggedIn = authentication.isLogged;
}]);