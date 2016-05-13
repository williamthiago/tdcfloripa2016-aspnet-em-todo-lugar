(function () {
    'use strict';

    angular
      .module('app.contact')
      .controller('ContactDetailController', controller);

    controller.$inject = ['contact', 'contactService', '$state', '$window'];

    function controller(contact, contactService, $state, $window) {
        var self = this;
        self.contact = contact;
        self.save = save;
        self.cancel = cancel;
        self.isEdit = isEdit();
        self.deleteContact = deleteContact;
        self.validate = false;
        self.fieldInvalid = fieldInvalid;
        self.submitError = false;
        self.clearErrors = clearErrors;

        init();

        function init() {
            clearErrors();
        }

        function clearErrors() {
            self.submitError = false;
            self.messages = [];
        };

        function handleError(result) {
            self.submitError = true;
            self.messages.push(result.data);
            $window.scrollTo(0, 0);
        }

        function deleteContact() {
            contactService.deleteContact(self.contact)
                .then(goToList);
        }

        function isEdit() {
            return !!self.contact.Id;
        }

        function save() {
            clearErrors();
            self.validate = true;
            if (self.form.$invalid) {
                handleError({ data: 'Preencha os campos obrigatórios' });
                return;
            }

            contactService.save(self.contact)
                .then(goToList)
                .catch(handleError);
        }

        function cancel() {
            delete self.contact;
            goToList();
        }

        function fieldInvalid(field, validation) {
            if (!self.validate)
                return false;

            if (validation) {
                return self.form[field].$error[validation];
            }

            return self.form[field].$invalid;
        };

        function goToList() {
            $state.go('app.contact-list');
        }
    }
})();