var app = app || {};

app.phoneViews = (function() {
    'use strict';
    function showAddPhone(selector) {
        $.get('templates/addPhoneScreen.html', function(template) {
            $(selector).html(template);

            $('#addPhone-btn').click(function() {
                var name = $('#personName').val(),
                    phoneNumber = $('#phoneNumber').val();

                if(name && phoneNumber) {
                    Sammy(function() {
                        this.trigger('addPhone', {
                            name: name,
                            phoneNumber: phoneNumber
                        });
                    });
                } else {
                    app.notifier.error('You missed to fill in the name or the phone number!');
                }

                return false;
            });
        })
    }

    function showAllPhones(selector, data) {
        $.get('templates/phonebookScreen.html', function(template) {
            var resultHTML = Mustache.render(template, { phones: data });

            $(selector).html(resultHTML);
        })
    }

    return {
        load: function() {
            return {
                showAddPhone: showAddPhone,
                showAllPhones: showAllPhones
            }
        }
    }

})();