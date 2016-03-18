var app = app || {};

app.phoneModel = (function() {
    'use strict';
    function PhoneModel(requester) {
        this.requester = requester;
        this.serviceUrl = this.requester.baseUrl + 'appdata/' + this.requester.appId + '/phones';
    }

    PhoneModel.prototype.addPhone = function(phoneData) {
        return this.requester.post(this.serviceUrl, phoneData, true);
    };

    PhoneModel.prototype.getAllPhones = function(userId) {
        var requestUrl = this.serviceUrl + '/?query={"_acl.creator":"'+ userId +'"}';
        return this.requester.get(requestUrl, true);
    };
    
    return {
        load: function(requester) {
            return new PhoneModel(requester);
        }
    }
})();