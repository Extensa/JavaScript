var app = app || {};

app.homeController = (function() {
    'use strict';
    function HomeController(viewBag) {
        this._viewBag = viewBag;
    }

    HomeController.prototype.loadWelcomeScreen = function(selector) {
        return this._viewBag.showWelcomePage(selector);
    };

    HomeController.prototype.loadUserHome = function(selector, data) {
        return this._viewBag.showUserHome(selector, data);
    };

    return {
        load: function(viewBag) {
            return new HomeController(viewBag);
        }
    }
})();