(function() {
    'use strict';

    angular
        .module('app.contact')
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('app.contact-list', {
                url: '/contacts/',
                views: {
                    'content': {
                        templateUrl: 'app/modules/contact/views/list.html',
                        controller: 'ContactListController',
                        controllerAs: 'ctrl'
                    }
                }
            })
            .state('app.contact-insert', {
                url: '/contacts/insert',
                views: {
                    'content': {
                        templateUrl: 'app/modules/contact/views/detail.html',
                        controller: 'ContactDetailController',
                        controllerAs: 'ctrl',
                        resolve: {
                            contact: function ()
                            {
                                return {};
                            }
                        }
                    }
                }
            })
            .state('app.contact-edit', {
                url: '/contacts/:id',
                views: {
                    'content': {
                        templateUrl: 'app/modules/contact/views/detail.html',
                        controller: 'ContactDetailController',
                        controllerAs: 'ctrl',
                        resolve: {
                            contact: ['contactService', '$stateParams', function (contactService, $stateParams) {
                                return contactService.getById($stateParams.id);
                            }]
                        }
                    }
                }
            });
    }
}());