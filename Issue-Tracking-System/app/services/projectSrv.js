angular.module('issueTrackingSystem.project', ['issueTrackingSystem.authentication'])
    .factory('projectSrv', ['$http', '$q', 'authenticationSrv','BASE_URL',
        function ($http, $q, authenticationSrv, BASE_URL) {

            function addProject(data) {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'Projects/',
                    method: 'POST',
                    data: data,
                    headers: authenticationSrv.getAuthHeader()
                }).then(function (success) {
                    deffered.resolve(success.data);
                }, function (error) {
                    deffered.reject(error);
                });

                return deffered.promise;
            }

            return {
                addProject: addProject
            }
    }]);