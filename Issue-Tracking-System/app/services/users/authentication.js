angular.module('issueTrackingSystem.users.authentication', [])
    .factory('authentication', ['$http', '$q', 'BASE_URL',
        function ($http, $q, BASE_URL) {

            function register(userData) {
                var deffered = $q.defer();

                $http.post(BASE_URL + 'Account/Register', userData)
                    .then(function (response) {
                        deffered.resolve(response.data);
                    });

                return deffered.promise;
            }

            function login(userData) {
                userData.grant_type = 'password';

                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'Token',
                    method: 'POST',
                    data: "userName=" + userData.username + "&password=" + userData.password +
                    "&grant_type=password"
                }).then(function (response) {
                        deffered.resolve(response.data);
                    });

                return deffered.promise;
            }

            return {
                register: register,
                login: login
            }
    }]);