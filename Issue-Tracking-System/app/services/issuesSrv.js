angular.module('issueTrackingSystem.issues', ['issueTrackingSystem.authentication'])
    .factory('issuesSrv', ['$http', '$q', 'authenticationSrv', 'BASE_URL',
        function ($http, $q, authenticationSrv, BASE_URL) {

            function getUserIssues(data) {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'Issues/me?pageSize='+ data.pageSize +'&pageNumber=' + data.currentPage +'&orderBy=DueDate desc',
                    method: 'GET',
                    headers: authenticationSrv.getAuthHeader()
                }).then(function (response) {
                    deffered.resolve(response.data);
                }, function (error) {
                    deffered.reject(error.data);
                });

                return deffered.promise;
            }

            return {
                getUserIssues: getUserIssues
            }
        }]);