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
    $scope.selectedClientId;
    $scope.selectedMouldId;
    $scope.selectedMouldTypeId;
    $scope.selectedPartId;
    $scope.selectedMouldDetailId;

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

    $scope.dataSave = {};

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
          $scope.selectedClientItem = { 
                  name: $scope.newRow.client.name,
                  value: $scope.newRow.client.name.toLowerCase(),
                  id: $scope.newRow.client.id
          };
          //$scope.selectedClientId =  $scope.newRow.client.id;
          $scope.selectedMouldId =$scope.newRow.mould.id;
          $scope.selectedMouldTypeId = $scope.newRow.mould_type.id;
          $scope.selectedPartId = $scope.newRow.part.id;
          $scope.selectedMouldDetailId = $scope.newRow.mould_detail.id;

          $scope.newRow.cavity = $scope.newRow.cavity.toString();
          $scope.newRow.job_date = new Date($scope.newRow.job_date);
          $scope.newRow.dispatch_date = new Date($scope.newRow.dispatch_date);
        });
      }
    }

    function getSelectedItem(selectedVal, array){
      return _.find(array, function(arr){
          return selectedVal == arr.id;
      });
    }

    function getSelectedSearchItem(selectedVal, array){
      return _.find(array, function(arr){
          return selectedVal.id == arr.id;
      });
    }

    Date.prototype.yyyymmdd = function() {
      var yyyy = this.getFullYear().toString();
      var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
      var dd  = this.getDate().toString();
      return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]); // padding
    };

    function createSaveData(){
      var selectedClient = getSelectedSearchItem($scope.selectedClientItem, $scope.clients);
      if(selectedClient){
        $scope.dataSave.client = selectedClient;
      }
      else{
        $scope.dataSave.client = {name: $scope.clientSearchText};
      }
      $scope.dataSave.mould = getSelectedItem($scope.selectedMouldId, $scope.mouldNos);
      $scope.dataSave.mould_detail = getSelectedItem($scope.selectedMouldDetailId, $scope.mouldDetails);
      $scope.dataSave.mould_type = getSelectedItem($scope.selectedMouldTypeId, $scope.mouldTypes);
      $scope.dataSave.part = getSelectedItem($scope.selectedPartId, $scope.parts);

      $scope.dataSave.cavity = parseInt($scope.newRow.cavity);
      $scope.dataSave.challan_no = parseInt($scope.newRow.challan_no);
      $scope.dataSave.bill_no = parseInt($scope.newRow.bill_no);

      $scope.dataSave.job_date = $scope.newRow.job_date.yyyymmdd();
      $scope.dataSave.dispatch_date = $scope.newRow.dispatch_date.yyyymmdd();

      $scope.dataSave.id = $scope.newRow.id;
      console.log($scope.dataSave);
    }

    //add to the real data holder
    $scope.onAddItemDone = function onAddItemDone() {
      createSaveData();
      if(!$state.params.mouldId){
        Mould.create($scope.dataSave).then(function (data) {
           $state.go('mould');
        });
      }
      else{
        $scope.onUpdateDone();
      }
    };
    
     //add to the real data holder
    $scope.onUpdateDone = function onUpdateDone() {
        Mould.updateMould($scope.dataSave).then(function (data) {
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
