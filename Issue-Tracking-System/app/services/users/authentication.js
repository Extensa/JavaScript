angular.module('issueTrackingSystem.users.authentication', [])
    .factory('authentication', ['$http', '$q', '$cookies', 'BASE_URL',
        function ($http, $q, $cookies, BASE_URL) {

            function setUserCredentials(userCredentials) {
                $cookies.put('identity', userCredentials.access_token, { expires: userCredentials['.expires'] });
            }

            function clearUserCredentials() {
                $cookies.remove('identity');
            }

            function getAuthHeader() {
                var accessToken = $cookies.get('identity');
                return {
                    Authorization: 'Bearer ' + accessToken
                };
            }

            function register(userData) {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'Account/Register',
                    method: 'POST',
                    data: userData
                }).then(function (response) {
                    deffered.resolve(response.data);
                });

                return deffered.promise;
            }

            function login(userData) {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'Token',
                    method: 'POST',
                    data: "userName=" + userData.username + "&password=" + userData.password +
                    "&grant_type=password"
                }).then(function (response) {
                    deffered.resolve(response.data);
                }, function (error) {
                    deffered.reject(error.data);
                });

                return deffered.promise;
            }

            function logout() {
                var deffered = $q.defer();

                $http({
                    url: BASE_URL + 'Account/Logout',
                    method: 'POST',
                    headers: this.getAuthHeader()
                }).then(function (response) {
                    deffered.resolve(response.data);
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
                register: register,
                login: login,
                logout: logout,
                isLogged: isLogged,
                setUserCredentials: setUserCredentials,
                clearUserCredentials: clearUserCredentials,
                getAuthHeader: getAuthHeader
            }
    }]);