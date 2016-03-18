var app = app || {};

app.homeViews = (function() {
    'use strict';
    function showWelcomePage(selector) {
        $.get('templates/welcomeScreen.html', function(template) {
            $(selector).html(template);
        });
    }

    function showUserHome(selector, data) {
        $.get('templates/userHomeScreen.html', function (template) {
            var result = Mustache.render(template, data);
            $(selector).html(result);
        })
    }

    return {
        load: function() {
            return {
                showWelcomePage: showWelcomePage,
                showUserHome: showUserHome
            }
        }
    }

})();