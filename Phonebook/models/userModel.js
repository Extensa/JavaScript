var app = app || {};

app.userModel = (function() {
    'use strict';

    function UserModel(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.baseUrl + 'user/' + this.requester.appId + '/';
    }

    UserModel.prototype.register = function(data) {
        return this.requester.post(this.serviceUrl, data);
    };

    UserModel.prototype.login = function(data) {
        var requestUrl = this.serviceUrl + 'login';
        return this.requester.post(requestUrl, data);
    };

    UserModel.prototype.logout = function() {
        var requestUrl = this.serviceUrl + '_logout';
        return this.requester.post(requestUrl, null, true);
    };

    return {
        load: function(requester) {
            return new UserModel(requester);
        }
    }
})();