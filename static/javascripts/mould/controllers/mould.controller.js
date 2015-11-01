/**
 * Register controller
 * @namespace thinkster.authentication.controllers
 */
(function () {
  'use strict';

  angular
    .module('projectx.mould.controllers')
    .controller('MouldController', MouldController);

  MouldController.$inject = ['$location', '$scope', 'Mould'];

  /**
   * @namespace RegisterController
   */
  function MouldController($location, $scope, Mould) {
    activate();

    function activate(){
       Mould.listMoulds().then(function (data) {
        $scope.rowCollection = data.data;
      });
    }
  }
})();
