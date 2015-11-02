/**
 * Register controller
 * @namespace thinkster.authentication.controllers
 */
(function () {
  'use strict';

  angular
    .module('projectx.mould.controllers')
    .controller('MouldController', MouldController);

  MouldController.$inject = ['$state', '$scope', 'Mould'];

  /**
   * @namespace RegisterController
   */
  function MouldController($state, $scope, Mould) {

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
       $state.go('newMould');
       /* $scope.isAddingRow = true;
        $scope.newRow.id = $scope.displayedCollection.length + 1;*/
        //$scope.rowCollection.push({});
        // call the db to update the mould list
    };

     //go to edit this mould
    $scope.updateItem = function updateItem(row) {
        $state.go('editMould', { mouldId: row.id });
    };

    //remove to the real data holder
    $scope.removeItem = function removeItem(row) {
        Mould.deleteMould(row.id).then(function (data) {
            var index = $scope.rowCollection.indexOf(row);
            if (index !== -1) {
                $scope.rowCollection.splice(index, 1);
            }
        });
    }
  }
})();
