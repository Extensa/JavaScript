angular.module('issueTrackingSystem.authentication', [])
    .factory('authentication', ['$http', '$q', '$cookies', 'BASE_URL',
        function ($http, $q, $cookies, BASE_URL) {
            
            function getAuthHeader() {
                var accessToken = $cookies.getObject('identity').access_token;

                return {
                    Authorization: 'Bearer ' + accessToken
                };
            }
            
            function changePass(userData) {
                console.log(userData);
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
                var cookie = $cookies.get('identity');

                return cookie != undefined;
            }

            return {
                changePass: changePass,
                register: register,
                login: login,
                logout: logout,
                isLogged: isLogged,
                getAuthHeader: getAuthHeader
            }
    }]);