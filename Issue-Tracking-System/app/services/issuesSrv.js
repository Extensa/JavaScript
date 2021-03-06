angular.module('issueTrackingSystem.issues', ['issueTrackingSystem.authentication'])
    .factory('issuesSrv', ['$http', '$q', 'authenticationSrv', 'BASE_URL',
        function ($http, $q, authenticationSrv, BASE_URL) {
            var lastLoadedIssue = lastLoadedIssue || {};

            function getLastLoadedIssue() {
                return lastLoadedIssue;
            }

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

            function getIssue(id) {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'Issues/' + id,
                    method: 'GET',
                    headers: authenticationSrv.getAuthHeader()
                }).then(function (response) {
                    deffered.resolve(response.data);
                    lastLoadedIssue = response.data;
                }, function (error) {
                    deffered.reject(error.data);
                });

                return deffered.promise;
            }

            function changeIssueStatus(issueId, statusId) {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'Issues/' + issueId + '/changestatus?statusid=' + statusId,
                    method: 'PUT',
                    headers: authenticationSrv.getAuthHeader()
                }).then(function (response) {
                    deffered.resolve(response.data);
                }, function (error) {
                    deffered.reject(error.data);
                });

                return deffered.promise;
            }

            function editIssue(issue) {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'Issues/' + issue.Id,
                    method: 'PUT',
                    data: issue,
                    headers: authenticationSrv.getAuthHeader()
                }).then(function (response) {
                    deffered.resolve(response.data);
                    console.log(response.data);
                }, function (error) {
                    deffered.reject(error.data);
                });

                return deffered.promise;
            }

            return {
                getUserIssues: getUserIssues,
                getIssue: getIssue,
                changeIssueStatus: changeIssueStatus,
                getLastLoadedIssue: getLastLoadedIssue,
                editIssue: editIssue
            }
        }]);