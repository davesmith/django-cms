/**
 * Register controller
 * @namespace thinkster.authentication.controllers
 */
(function () {
  'use strict';

  angular
    .module('projectx.mould.controllers')
    .controller('MouldController', MouldController);

  MouldController.$inject = ['$state', '$scope', 'toaster', 'Mould'];

  /**
   * @namespace RegisterController
   */
  function MouldController($state, $scope, toaster, Mould) {

    function isMemberOfGroup(groupName, groups){
      return (groups.indexOf(groupName) != -1);
    }

    $scope.hasEditRights = window.user.isSuperUser || isMemberOfGroup("Designer", window.user.groups);

    activate();

    function activate(){
       Mould.listMoulds().then(function (data) {
        toaster.pop('success', "Job Works List ", "Job works loaded.");

        $scope.rowCollection = data.data;
        updateUpcomingDispatches();
        //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
        $scope.displayedCollection = [].concat($scope.rowCollection);
      });
    }

    function updateUpcomingDispatches(){
      _.each($scope.rowCollection, function(arr){
          //arr.job_date = new Date(arr.job_date);
          //arr.dispatch_date = new Date(arr.dispatch_date);

          var dayDiff = moment(arr.dispatch_date).diff(moment(), 'days');
          if(dayDiff >= 0 && dayDiff <= 3){
            arr.isUpcoming = true;
          }
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
