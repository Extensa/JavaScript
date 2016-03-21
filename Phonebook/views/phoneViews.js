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
                var row = $($(this).parents('tr')[0]),
                    phoneId = $(this).parent().attr('id');

                _this.showEditPhone(row, phoneId);
            });

            $('.delete-btn').click(function() {
                var parent = $(this).parent(),
                    phoneId = $(this).parent().attr('id');

                _this.showDeletePhone(parent, phoneId);
            });
        })
    }

    function showEditPhone(row, phoneId) {
        var currentData = {
            name: row.children().eq(0).text(),
            phoneNumber: row.children().eq(1).text()
        };

        $.get('templates/phone/editPhoneScreen.html', function(template) {
            var resultHtml = Mustache.render(template, currentData);
            row.html(resultHtml);

            $('.phone-edit-btn').click(function() {
                var editedPhoneData = {
                    id: phoneId,
                    name: $('#edited-name').val(),
                    phoneNumber: $('#edited-phone').val()
                };

                Sammy(function() {
                    this.trigger('editPhone', editedPhoneData);
                })
            })
        })
    }

    function showDeletePhone(parentElement, phoneId) {
        parentElement.html($('<a>Confirm</a>').attr({
            class: 'buttonSmall confirm-del-btn',
            href: '#'
        }));

        $('.confirm-del-btn').click(function() {
            Sammy(function() {
                this.trigger('deletePhone', phoneId);
            });
        });
    }

    return {
        load: function() {
            return {
                showAddPhone: showAddPhone,
                showAllPhones: showAllPhones,
                showEditPhone: showEditPhone,
                showDeletePhone: showDeletePhone
            }
        }
    }

})();