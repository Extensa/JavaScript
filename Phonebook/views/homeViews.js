var app = app || {};

app.homeViews = (function() {
    'use strict';
    function showWelcomePage(selector) {
        $.get('templates/home/welcomeScreen.html', function(template) {
            $(selector).html(template);
        });
    }

    function showUserHome(selector, data) {
        $.get('templates/home/userHomeScreen.html', function (template) {
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