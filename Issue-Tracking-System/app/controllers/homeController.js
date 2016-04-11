angular.module('issueTrackingSystem.home', ['issueTrackingSystem.users.authentication'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'app/views/home/login_and_register.html',
            controller: 'HomeController'
        });
    }])

    .controller('HomeController', ['$scope', '$location', 'authentication',
        function ($scope, $location, authentication) {
        $scope.register = function (userData) {
            authentication.register(userData)
                .then(function (response) {
                    console.log(response);
                })
        }
    }]);