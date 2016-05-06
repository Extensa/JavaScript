angular.module('issueTrackingSystem.authentication', [])
    .factory('authenticationSrv', ['$http', '$q', '$cookies', 'BASE_URL',
        function ($http, $q, $cookies, BASE_URL) {
            
            function getAuthHeader() {
                var accessToken = $cookies.getObject('identity').access_token;

                return {
                    Authorization: 'Bearer ' + accessToken
                };
            }
            
            function changePass(userData) {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'api/Account/ChangePassword',
                    method: 'POST',
                    data: userData,
                    headers: this.getAuthHeader()
                }).then(function () {
                    deffered.resolve();
                }, function (error) {
                    deffered.reject(error);
                });

                return deffered.promise;
            }

            function register(userData) {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'api/Account/Register',
                    method: 'POST',
                    data: userData
                }).then(function () {
                    deffered.resolve();
                }, function (error) {
                    deffered.reject(error.data);
                });

                return deffered.promise;
            }

            function login(userData) {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'api/Token',
                    method: 'POST',
                    data: "userName=" + userData.username + "&password=" + userData.password +
                    "&grant_type=password"
                }).then(function (userCredentials) {
                    deffered.resolve();

                    $http({
                        url: BASE_URL + 'users/me',
                        method: 'GET',
                        headers: { Authorization: 'Bearer ' + userCredentials.data.access_token }
                    }).then(function (response) {
                        userCredentials.data.isAdmin = response.data.isAdmin;
                        userCredentials.data.id = response.data.Id;

                        $cookies.putObject('identity', userCredentials.data, { expires: userCredentials.data['.expires'] });
                    });

                }, function (error) {
                    deffered.reject(error.data);
                });

                return deffered.promise;
            }

            function logout() {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'api/Account/Logout',
                    method: 'POST',
                    headers: this.getAuthHeader()
                }).then(function () {
                    deffered.resolve();
                    $cookies.remove('identity');
                }, function (error) {
                    deffered.reject(error.data);
                });

                return deffered.promise;
            }

            function isLogged() {
                var cookie = $cookies.getObject('identity');

                return cookie != undefined;
            }

            function isAdmin() {
                var cookie = $cookies.getObject('identity');
                
                return cookie != undefined && cookie.isAdmin;
            }

            function getUserId() {
                var id = $cookies.getObject('identity').id;

                return id;
            }

            return {
                changePass: changePass,
                register: register,
                login: login,
                logout: logout,
                isLogged: isLogged,
                isAdmin: isAdmin,
                getAuthHeader: getAuthHeader,
                getUserId: getUserId
            }
    }]);