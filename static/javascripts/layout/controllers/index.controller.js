/**
 * IndexController
 * @namespace thinkster.layout.controllers
 */
(function () {
  'use strict';

  angular
    .module('projectx.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope'];

  /**
   * @namespace IndexController
   */
  function IndexController($scope) {
  	var vm = this;
    vm.name = "Jignesh";
  }
})();
