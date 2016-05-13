(function() {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.html5Mode(false);

        $stateProvider
            .state('app', {
                abstract: true,
                url: "",
                views: {
                    root: {
                        templateUrl: "/app/views/app.html"
                    }
                }
            });

        $urlRouterProvider
            .when("", "/contacts/");
    }
}());