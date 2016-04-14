angular.module('issueTrackingSystem.notify', [])
    .factory('notify', [function () {
        var options = {
            layout: 'bottomRight',
            theme: 'relax',
            timeout: 1700
        };

        function success(message) {
            options.type = 'success';
            options.text = message;
            
            noty(options);
        }

        function error(message) {
            options.type = 'error';
            options.text = message;

            noty(options);
        }

        return {
            success: success,
            error: error
        }
    }]);