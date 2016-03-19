var app = app || {};

app.phoneViews = (function() {
    'use strict';
    function showAddPhone(selector) {
        $.get('templates/phone/addPhoneScreen.html', function(template) {
            $(selector).html(template);

            $('#addPhone-btn').click(function() {
                var phoneData = {
                    name: $('#personName').val(),
                    phoneNumber: $('#phoneNumber').val()
                };

                if(phoneData.name && phoneData.phoneNumber) {
                    Sammy(function() {
                        this.trigger('addPhone', phoneData);
                    });
                } else {
                    app.notifier.error('You missed to fill in the name or the phone number!');
                }

                return false;
            });
        })
    }

    function showAllPhones(selector, data) {
        var _this = this;
        $.get('templates/phone/phonebookScreen.html', function(template) {
            var resultHTML = Mustache.render(template, { phones: data });
            $(selector).html(resultHTML);
            $('.edit-btn').click(function() {
                var btn = $(this);
                _this.showEditPhone(btn);
            });
        })
    }

    function showEditPhone(editButton) {
        var id = editButton.parent().attr('id'),
            tr = $(editButton.parent().parent()[0]),
            currentData = {
                name: tr.children()[0].innerHTML,
                phoneNumber: tr.children()[1].innerHTML
            };

        $.get('templates/phone/editPhoneScreen.html', function(template) {
            var resultHtml = Mustache.render(template, currentData);
            tr.html(resultHtml);
            $('.phone-edit-btn').click(function() {
                var editedPhoneData = {
                    id: id,
                    name: $('#edited-name').val(),
                    phoneNumber: $('#edited-phone').val()
                };

                Sammy(function() {
                    this.trigger('editPhone', editedPhoneData);
                })
            });
        })
    }

    return {
        load: function() {
            return {
                showAddPhone: showAddPhone,
                showAllPhones: showAllPhones,
                showEditPhone: showEditPhone
            }
        }
    }

})();