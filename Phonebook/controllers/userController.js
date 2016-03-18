var app = app || {};

app.userController = (function() {
    'use strict';
    function UserController(model, viewBag) {
        var _this = this;
        this._model = model;
        this._viewBag = viewBag;
    }

    UserController.prototype.loadRegisterForm = function(selector) {
        return this._viewBag.showRegisterForm(selector);
    };

    UserController.prototype.loadLoginForm = function(selector) {
        return this._viewBag.showLoginForm(selector);
    };

    UserController.prototype.register = function(data) {
        var userCredentialsModel = {
            username: data.username,
            password: data.password,
            fullName: data.fullName
        };

        this._model.register(userCredentialsModel)
            .then(function(success) {
                setSessionData(success);

                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/home' });
                })
            }, function(error) {
                console.log(error);
            });
    };

    UserController.prototype.login = function (data) {
        var userCredentialModel = {
            username: data.username,
            password: data.password
        };

        this._model.login(userCredentialModel)
            .then(function(success) {
                setSessionData(success);

                Sammy(function () {
                    this.trigger('redirectUrl', { url: '#/home' });
                });

                app.notifier.success('Successfully logged in!');
            }, function() {
                app.notifier.error('Wrong username or password!');
            }).done();


    };

    UserController.prototype.logout = function() {
        return this._model.logout()
            .then(function() {
                sessionStorage.clear();
            })
    };

    function setSessionData(data) {
        sessionStorage['username'] = data.username;
        sessionStorage['fullName'] = data.fullName;
        sessionStorage['sessionToken'] = data._kmd.authtoken;
        sessionStorage['userId'] = data._id;
    }

    return {
        load: function(model, viewBag) {
            return new UserController(model, viewBag);
        }
    }
})();