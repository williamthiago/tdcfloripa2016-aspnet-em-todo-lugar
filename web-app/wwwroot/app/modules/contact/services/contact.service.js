(function () {
    'use strict';

    angular
        .module('app.contact')
        .service('contactService', service);

    service.$inject = ['$q', '$http'];

    function service($q, $http) {
        return {
            get: get,
            getById: getById,
            save: save,
            deleteContact: deleteContact
        };

        function deleteContact(contact) {
            return $http.delete('/api/contacts/' + contact.Id);
        }

        function save(contact) {
            if (contact.Id) {
                return $http.put('/api/contacts/' + contact.Id, contact);
            } else {
                return $http.post('/api/contacts/', contact);
            }
        }

        function getById(id) {
            return $http.get('/api/contacts/' + id)
                .then(function(response) {
                    return response.data;
                });
        }

        function get() {
            return $http.get('/api/contacts');
        }
    }
}());