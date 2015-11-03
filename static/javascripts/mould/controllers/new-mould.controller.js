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
    $scope.selectedClient = null;

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
           $scope.clients = $scope.clients.map( function (client) {
                return {
                  name: client.name,
                  value: client.name.toLowerCase(),
                  id: client.id
                };
            });
        });
    }

    function getSelectableFieldsData () {
        Mould.listMouldTypes().then(function (data) {
           $scope.mouldTypes = data.data;
        });

        Mould.listMouldNo().then(function (data) {
           $scope.mouldNos = data.data;
        });

        Mould.listMouldDetails().then(function (data) {
           $scope.mouldDetails = data.data;
        });

        Mould.listParts().then(function (data) {
           $scope.parts = data.data;
        });
    }


    function activate(){
      getClients();
      getSelectableFieldsData();

      if($state.params.mouldId){
         Mould.listMould($state.params.mouldId).then(function (data) {
           $scope.newRow = data.data;
        });
      }
    }

    //add to the real data holder
    $scope.onAddItemDone = function onAddItemDone() {
      if(!$state.params.mouldId){
        Mould.create($scope.newRow).then(function (data) {
           $state.go('mould');
           console.log($scope.newRow);
        });
      }
      else{
        $scope.onUpdateDone();
      }
    };
    
     //add to the real data holder
    $scope.onUpdateDone = function onUpdateDone() {
        Mould.updateMould($scope.newRow).then(function (data) {
           $state.go('mould');
        });
    };

    //Code for client auto-complete
    $scope.selectedClientItem;
    $scope.clientQuerySearch = clientQuerySearch;
    $scope.clientSearchText;
    $scope.selectedClientItemChange = selectedClientItemChange;
    $scope.clientSearchTextChange   = clientSearchTextChange;
    $scope.addNewClient = addNewClient;

    function clientQuerySearch (query) {
      var results = query ? $scope.clients.filter( createFilterFor(query) ) : $scope.clients;
      return results;
    }

    function addNewClient () {
      console.log("adding new client");
    }

   function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(client) {
        return (client.value.indexOf(lowercaseQuery) === 0);
      };
    }

    function clientSearchTextChange(text) {
      console.log('Text changed to ' + text);
    }
    function selectedClientItemChange(item) {
      console.log('Item changed to ' + JSON.stringify(item));
    }
  }
})();
