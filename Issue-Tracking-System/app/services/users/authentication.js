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

            return {
                register: register
            }
    }]);