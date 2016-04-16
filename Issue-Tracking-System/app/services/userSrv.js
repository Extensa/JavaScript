angular.module('issueTrackingSystem.user', ['issueTrackingSystem.authentication'])
    .factory('userSrv', ['$http', '$q', 'authenticationSrv', 'BASE_URL',
        function ($http, $q, authenticationSrv, BASE_URL) {

            function getAllUsers() {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'Users/',
                    method: 'GET',
                    headers: authenticationSrv.getAuthHeader()
                }).then(function (users) {
                    deffered.resolve(users.data);
                }, function (error) {
                    deffered.reject(error);
                });

                return deffered.promise;
            }

            return {
                getAllUsers: getAllUsers
            }
    }]);