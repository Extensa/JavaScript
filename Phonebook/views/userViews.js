var app = app || {};

app.userViews = (function() {
    'use strict';
    function showRegisterForm(selector) {
        $.get('templates/registration.html', function(template) {
            $(selector).html(template);
            $('#reg-btn').click(function() {
                var username = $('#username').val(),
                    password = $('#password').val(),
                    fullName = $('#fullName').val();

                $.sammy(function() {
                    this.trigger('register', {
                        username: username,
                        password: password,
                        fullName: fullName
                    });
                });

                return false;
            });
        });
    }

    function showLoginForm(selector) {
        $.get('templates/login.html', function(template) {
            $(selector).html(template);
            $('#login-btn').click(function() {
                var username = $('#username').val(),
                    password = $('#password').val();

                Sammy(function() {
                    this.trigger('login', { username: username, password: password });
                });

                return false;
            });
        })
    }
    
    function showEditForm(selector) {
        $.get('templates/editProfileScreen.html', function(template) {
            var currentUserData = { username: sessionStorage['username'], fullName: sessionStorage['fullName'] };

            var resultHtml = Mustache.render(template, currentUserData);
            $(selector).html(resultHtml);

            $('#edit-btn').click(function() {
                var updatedUserData = {
                    id: sessionStorage['userId'],
                    username: $('#username').val(),
                    password: $('#password').val(),
                    fullName: $('#fullName').val()
                };

                if(updatedUserData.username === currentUserData.username &&
                   updatedUserData.fullName === currentUserData.fullName &&
                   updatedUserData.password === '') {
                    app.notifier.error('You didn\'t change anything...');
                } else {
                    Sammy(function() {
                        this.trigger('editProfile', updatedUserData);
                    });
                }

                return false;
            });
        })
    }

    return {
        load: function() {
            return {
                showRegisterForm: showRegisterForm,
                showLoginForm: showLoginForm,
                showEditForm: showEditForm
            }
        }
    }
})();