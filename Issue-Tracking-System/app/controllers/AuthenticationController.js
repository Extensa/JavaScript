angular.module('issueTrackingSystem.authenticationCtrl', ['issueTrackingSystem.users.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/home/login_and_register.html',
            controller: 'AuthenticationController'
        });
    }])
    .controller('AuthenticationController', ['$scope', 'authentication',
        function AuthenticationController($scope, authentication) {
            $scope.login = function (userData) {
                authentication.login(userData)
                    .then(function (success) {
                        authentication.setUserCredentials(success);
                    });
            };

            $scope.logout = function () {
                authentication.logout()
                    .then(function () {
                        authentication.clearUserCredentials();
                    })
            };
            
            $scope.register = function (userData) {
                authentication.register(userData)
                    .then(function (success) {
                        
                    })
                
            };

            $scope.isLoggedIn = authentication.isLogged;
}]);