angular.module('issueTrackingSystem.notify', [])
    .factory('notifySrv', [function () {
        var options = {
            layout: 'bottomRight',
            theme: 'relax',
            timeout: 1900
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