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
    $scope.newRow = {
      bill_no: "",
      cavity: null,
      challan_no: "",
      client: "",
      dispatch_date: "2015-10-31",
      drawing_no: "",
      job_date: "2015-10-31",
      mould: "",
      mould_detail: null,
      mould_type: null,
      part: null
    };

    activate();

    function activate(){
       Mould.listMoulds().then(function (data) {
        $scope.rowCollection = data.data;
        //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
        $scope.displayedCollection = [].concat($scope.rowCollection);

      });
    }

    //add to the real data holder
    $scope.addItem = function addItem() {
        $scope.isAddingRow = true;
        $scope.newRow.id = $scope.displayedCollection.length + 1;
        //$scope.rowCollection.push({});
        // call the db to update the mould list
    };

    //add to the real data holder
    $scope.onAddItemDone = function onAddItemDone() {
        $scope.isAddingRow = false;
        $scope.rowCollection.push($scope.newRow);
         $scope.newRow = {};
        // call the db to update the mould list
    };
    

     //add to the real data holder
    $scope.updateItem = function updateItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1, row);
        }
        // call the db to update the mould list
    };

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
            $scope.rowCollection.splice(index, 1);
        }

        // call db to remove item from mould list
    }

    //---------date picker classes---------//

    $scope.open = function($event) {
      $scope.status.opened = true;
    };

    $scope.status = {
      opened: false
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
  }
})();
