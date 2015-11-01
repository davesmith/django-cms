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
        //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
        $scope.displayedCollection = [].concat($scope.rowCollection);

      });
    }


    //add to the real data holder
    $scope.addItem = function addItem() {
        $scope.rowCollection.push({});
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
  }
})();
