var app = app || {};

app.userController = (function() {
    'use strict';
    function UserController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    UserController.prototype.loadRegisterForm = function(selector) {
        return this._viewBag.showRegisterForm(selector);
    };

    UserController.prototype.loadLoginForm = function(selector) {
        return this._viewBag.showLoginForm(selector);
    };

    UserController.prototype.loadEditProfileForm = function(selector) {
        return this._viewBag.showEditForm(selector);
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
                app.notifier.error(error.responseJSON.description);
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
            }, function(error) {
                app.notifier.error(error.responseJSON.description);
            }).done();


    };

    UserController.prototype.logout = function() {
        return this._model.logout()
            .then(function() {
                sessionStorage.clear();
            })
    };

    UserController.prototype.edit = function(data) {
        this._model.edit(data)
            .then(function(success) {
                setSessionData(success);
                app.notifier.success('Your profile has been successfully edited!');
            },function(error) {
                app.notifier.error(error.responseJSON.description);
            });
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