var app = app || {};

app.phoneController = (function() {
    'use strict';
    function PhoneController(model, viewBag) {
        this._model = model;
        this._viewBag = viewBag;
    }

    PhoneController.prototype.loadAddPhoneForm = function(selector) {
        return this._viewBag.showAddPhone(selector);
    };

    PhoneController.prototype.loadPhoneBook = function(selector, data) {
        return this._viewBag.showAllPhones(selector, data);
    };

    PhoneController.prototype.addPhone = function(phoneData) {
        var phoneBindingModel = {
            name: phoneData.name,
            phoneNumber: phoneData.phoneNumber
        };

        this._model.addPhone(phoneBindingModel)
            .then(function() {
                app.notifier.success('Phone added!');
            }).done();
    };

    PhoneController.prototype.getAllPhones = function(userId) {
        return this._model.getAllPhones(userId);
    };

    return {
        load: function(model, viewBag) {
            return new PhoneController(model, viewBag);
        }
    }
})();
