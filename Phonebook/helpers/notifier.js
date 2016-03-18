var app = app || {};

app.notifier = (function() {
    'use strict';
    var container = $('#notify'),
        options = {
            theme: 'relax',
            killer: true,
            timeout: 2500
        };

    function success(text) {
        options.text = text;
        options.type = 'success';

        container.noty(options);
    }

    function error(text) {
        options.text = text;
        options.type = 'error';

        container.noty(options);
    }

    return {
        success: success,
        error: error
    }
})();