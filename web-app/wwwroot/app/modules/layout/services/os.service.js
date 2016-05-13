(function () {
    'use strict';

    angular
        .module('app.layout')
        .service('osService', service);

    service.$inject = ['$q', '$http'];

    function service($q, $http) {
        return {
            getOS: getOS
        };
        
        function translateOS(version) {
            if (version.indexOf('Windows') >= 0) {
                return 'windows';
            } else if (version.indexOf('Linux') >= 0) {
                return 'linux';
            } else if (version.indexOf('Darwin') >= 0) {
                return 'mac';
            }
        }

        function getOS() {
            var deferred = $q.defer();
            
            $http.get('/api/os/version')
                .then(function(result) {
                    deferred.resolve(translateOS(result.data.OSDescription));
                }, function() {
                    deferred.reject();
                });
            
            return deferred.promise;
        }
    }
}());