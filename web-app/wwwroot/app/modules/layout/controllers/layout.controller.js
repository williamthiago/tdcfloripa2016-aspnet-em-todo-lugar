(function () {
    'use strict';

    angular
      .module('app.layout')
      .controller('LayoutController', controller);

    controller.$inject = ['osService'];


    function controller(osService) {
        var self = this;
        self.os = undefined;

        init();

        function init() {
            osService.getOS().then(function(os) {
                self.os = os;
            });
        }
    }
})();