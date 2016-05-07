angular.module('issueTrackingSystem.project', ['issueTrackingSystem.authentication'])
    .factory('projectSrv', ['$http', '$q', 'authenticationSrv','BASE_URL',
        function ($http, $q, authenticationSrv, BASE_URL) {
            var lastLoadedProject = lastLoadedProject || {};

            function getLastLoadedProject() {
                return lastLoadedProject;
            }

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
                    deffered.reject(error.data);
                });

                return deffered.promise;
            }

            function getProject(projectId) {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'Projects/' + projectId,
                    method: 'GET',
                    headers: authenticationSrv.getAuthHeader()
                }).then(function (response) {
                    deffered.resolve(response.data);
                    lastLoadedProject = response.data;
                }, function (error) {
                    deffered.reject(error.data);
                });

                return deffered.promise;
            }

            return {
                addProject: addProject,
                getProject: getProject,
                getLastLoadedProject: getLastLoadedProject
            }
    }]);