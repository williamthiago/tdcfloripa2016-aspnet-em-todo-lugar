(function () {
    'use strict';

    angular
      .module('app.contact')
      .controller('ContactListController', controller);

    controller.$inject = ['contactService'];


    function controller(contactService) {
        var self = this;
        self.contactsLoaded = false;
        self.contacts = [];

        init();

        function init() {
            contactService.get().then(function(response) {
                self.contacts = response.data;
                self.contactsLoaded = true;
            });
        }
    }
})();