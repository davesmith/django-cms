/**
 * Register controller
 * @namespace thinkster.authentication.controllers
 */
(function () {
  'use strict';

  angular
    .module('projectx.mould.controllers')
    .controller('NewMouldController', NewMouldController);

  NewMouldController.$inject = ['$state', '$scope', 'toaster', 'Mould'];

  /**
   * @namespace RegisterController
   */
  function NewMouldController($state, $scope, toaster, Mould) {
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
           $scope.mouldTypes = $scope.mouldTypes.map( function (type) {
                return {
                  detail: type.detail,
                  value: type.detail.toLowerCase(),
                  id: type.id
                };
           });
        });

        Mould.listMouldNo().then(function (data) {
           $scope.mouldNos = data.data;
           $scope.mouldNos = $scope.mouldNos.map( function (mouldNo) {
                return {
                  name: mouldNo.name,
                  value: mouldNo.name.toLowerCase(),
                  id: mouldNo.id
                };
            });
        });

        Mould.listMouldDetails().then(function (data) {
           $scope.mouldDetails = data.data;
           $scope.mouldDetails = $scope.mouldDetails.map( function (mouldDetail) {
                return {
                  detail: mouldDetail.detail,
                  value: mouldDetail.detail.toLowerCase(),
                  id: mouldDetail.id
                };
           });
        });

        Mould.listParts().then(function (data) {
           $scope.parts = data.data;
             $scope.parts = $scope.parts.map( function (part) {
                return {
                  name: part.name,
                  value: part.name.toLowerCase(),
                  id: part.id
                };
            });
        });
    }

    function activate(){
      getClients();
      getSelectableFieldsData();

      if($state.params.mouldId){
         Mould.listMould($state.params.mouldId).then(function (data) {
          $scope.newRow = data.data;

          if($scope.newRow.client){
            $scope.selectedClientItem = { 
                  name: $scope.newRow.client.name,
                  value: $scope.newRow.client.name.toLowerCase(),
                  id: $scope.newRow.client.id
            };
          }

          if($scope.newRow.mould){
            $scope.selectedMouldNo = { 
                  name: $scope.newRow.mould.name,
                  value: $scope.newRow.mould.name.toLowerCase(),
                  id: $scope.newRow.mould.id
            };
          }
         
          if($scope.newRow.mould_type){
            $scope.selectedMouldType = { 
                  detail: $scope.newRow.mould_type.detail,
                  value: $scope.newRow.mould_type.detail.toLowerCase(),
                  id: $scope.newRow.mould_type.id
            };
          }


          if($scope.newRow.mould_detail)
          {
            $scope.selectedMouldDetail = { 
                  detail: $scope.newRow.mould_detail.detail,
                  value: $scope.newRow.mould_detail.detail.toLowerCase(),
                  id: $scope.newRow.mould_detail.id
            };
          }

          if($scope.newRow.part){
            $scope.selectedPart = { 
                  name: $scope.newRow.part.name,
                  value: $scope.newRow.part.name.toLowerCase(),
                  id: $scope.newRow.part.id
            };
          }
       
          if($scope.newRow.cavity){
            $scope.newRow.cavity = $scope.newRow.cavity.toString();
          }

          $scope.newRow.job_date = new Date($scope.newRow.job_date);
          $scope.newRow.dispatch_date = new Date($scope.newRow.dispatch_date);
        });
      }

      toaster.pop('info', "New Mould:", "Please fill the details...", 3000);
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

    function getSelectedValueItem(selectedVal, arrayCollection, nameType, searchText){
       if(selectedVal){
        var filteredVal = getSelectedSearchItem(selectedVal, arrayCollection);
        if(filteredVal){
          return filteredVal;
        }
      }
      else{
        var newVal = {};
        newVal[nameType] = searchText;
        return newVal;
      }
    }

    function createSaveData(){
      $scope.dataSave.client = getSelectedValueItem($scope.selectedClientItem, $scope.clients, "name", $scope.clientSearchText);
      $scope.dataSave.mould = getSelectedValueItem($scope.selectedMouldNo, $scope.mouldNos, "name", $scope.mouldSearchText);
      $scope.dataSave.mould_detail = getSelectedValueItem($scope.selectedMouldDetail, $scope.mouldDetails, "detail", $scope.mouldDetailSearchText);
      $scope.dataSave.mould_type = getSelectedValueItem($scope.selectedMouldType, $scope.mouldTypes, "detail", $scope.mouldTypeSearchText);
      $scope.dataSave.part = getSelectedValueItem($scope.selectedPart, $scope.parts, "name", $scope.partSearchText);
     
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
          toaster.pop('success', "Job Works List", "New Job work added!");
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
          toaster.pop('success', "Job Works List", "Job work updated!");
           $state.go('mould');
        });
    };

    //Code for client auto-complete
    $scope.clientQuerySearch = clientQuerySearch;
    $scope.addNewClient = addNewClient;

    function clientQuerySearch (query) {
      var results = query ? $scope.clients.filter( createFilterFor(query) ) : $scope.clients;
      return results;
    }

    $scope.mouldQuerySearch = mouldQuerySearch;
    function mouldQuerySearch (query) {
      var results = query ? $scope.mouldNos.filter( createFilterFor(query) ) : $scope.mouldNos;
      return results;
    }

    $scope.mouldDetailQuerySearch = mouldDetailQuerySearch;
    function mouldDetailQuerySearch (query) {
      var results = query ? $scope.mouldDetails.filter( createFilterFor(query) ) : $scope.mouldDetails;
      return results;
    }

    $scope.mouldTypeQuerySearch = mouldTypeQuerySearch;
    function mouldTypeQuerySearch (query) {
      var results = query ? $scope.mouldTypes.filter( createFilterFor(query) ) : $scope.mouldTypes;
      return results;
    }

    $scope.partQuerySearch = partQuerySearch;
    function partQuerySearch (query) {
      var results = query ? $scope.parts.filter( createFilterFor(query) ) : $scope.parts;
      return results;
    }

    function addNewClient () {
      console.log("adding new client");
    }

   function createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(item) {
        return (item.value.indexOf(lowercaseQuery) === 0);
      };
    }
  }
})();
