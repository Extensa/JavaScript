var app = app || {};

(function(){
    app.router = Sammy(function() {
        var requester = app.requester.config('kid_b1oSO84qyb', '8ea3f99d0e074e6998a4e1ae4d6f4b20'),
            selector = '#wrapper';

        var homeViews = app.homeViews.load(),
            homeController = app.homeController.load(homeViews);

        var userModel = app.userModel.load(requester),
            userViews = app.userViews.load(),
            userController = app.userController.load(userModel, userViews);

        var phoneModel = app.phoneModel.load(requester),
            phoneViews = app.phoneViews.load(),
            phoneController = app.phoneController.load(phoneModel, phoneViews);

        this.before(function () {
            if(!sessionStorage['userId']) {
                $.get('templates/guestNavigation.html', function(navigation) {
                    $('#menu').html(navigation);
                });
            } else {
                $.get('templates/userNavigation.html', function(navigation) {
                    $('#menu').html(navigation);
                })
            }
        });

        this.before('#/home', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                return false;
            }
        });

        this.before('#/', function() {
            var userId = sessionStorage['userId'];
            if(userId) {
                this.redirect('#/home');
                return false;
            }
        });

        this.before('#/phones(.*)', function() {
            var userId = sessionStorage['userId'];
            if(!userId) {
                this.redirect('#/');
                return false;
            }
        });

        this.get('#/', function() {
            homeController.loadWelcomeScreen(selector);
        });

        this.get('#/register', function() {
            userController.loadRegisterForm(selector);
        });

        this.get('#/login', function() {
            userController.loadLoginForm(selector);
        });

        this.get('#/logout', function() {
            var _this = this;
            userController.logout()
                .then(function() {
                    _this.redirect('#/');
                }).done();
        });

        this.get('#/user/edit', function() {
            userController.loadEditProfileForm(selector);
        });

        this.get('#/home', function () {
            var data = {
                fullName: sessionStorage['fullName'],
                username: sessionStorage['username']
            };
            homeController.loadUserHome(selector, data);
        });

        this.get('#/phones/add', function() {
            phoneController.loadAddPhoneForm(selector);
        });

        this.get('#/phones', function() {
            var userId = sessionStorage['userId'];
            phoneController.loadPhoneBook(selector, userId);
        });

        this.bind('redirectUrl', function (e, data) {
            this.redirect(data.url);
        });

        this.bind('register', function(e, data) {
            userController.register(data);
        });

        this.bind('login', function(e, data) {
            userController.login(data);
        });

        this.bind('editProfile', function(e, data) {
           userController.edit(data);
        });

        this.bind('addPhone', function(e, data) {
            phoneController.addPhone(data);
        });

        this.bind('editPhone', function(e, data) {
            phoneController.editPhone(data);
        });

        this.bind('deletePhone', function(e, id) {
            phoneController.deletePhone(id);
        });
    });

    app.router.run('#/');
}());