/**
 * Register controller
 * @namespace thinkster.authentication.controllers
 */
(function () {
  'use strict';

  angular
    .module('projectx.mould.controllers')
    .controller('NewMouldController', NewMouldController);

  NewMouldController.$inject = ['$state', '$scope', 'Mould'];

  /**
   * @namespace RegisterController
   */
  function NewMouldController($state, $scope, Mould) {
    $scope.newRow = {
      bill_no: "",
      cavity: null,
      challan_no: "",
      client: "",
      dispatch_date: new Date(),
      drawing_no: "",
      job_date: null,
      mould: "",
      mould_detail: null,
      mould_type: null,
      part: null
    };

    activate();

    function getClients () {
         Mould.listClients().then(function (data) {
           $scope.clients = data.data;
        });
    }

    function getMouldTypes () {
         Mould.listMouldTypes().then(function (data) {
           $scope.mouldTypes = data.data;
        });
    }

    function activate(){
      getClients();
      getMouldTypes();

      if($state.params.mouldId){
         Mould.listMould($state.params.mouldId).then(function (data) {
           $scope.newRow = data.data;
        });
      }
    }

    //add to the real data holder
    $scope.onAddItemDone = function onAddItemDone() {
         //Mould.create($scope.newRow).then(function (data) {
           $state.go('mould');
           console.log($scope.newRow);
        //});
       
        // call the db to update the mould list
    };
    
     //add to the real data holder
    $scope.onUpdateDone = function onUpdateDone() {
        Mould.updateMould($scope.mould).then(function (data) {
           $state.go('/');
        });
    };
  }
})();
