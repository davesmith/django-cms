/**
 * Authentication
 * @namespace thinkster.authentication.services
 */
(function () {
  'use strict';

  angular
    .module('projectx.mould.services')
    .factory('Mould', Mould);

  Mould.$inject = ['$http'];

  /**
   * @namespace Authentication
   * @returns {Factory}
   */
  function Mould($http) {
    /**
     * @name Authentication
     * @desc The Factory to be returned
     */
    var Mould = {
      listMoulds: listMoulds,
      listMould: listMould,
      deleteMould: deleteMould,
      listClients: listClients,
      listMouldTypes: listMouldTypes,
      listMouldNo: listMouldNo,
      listMouldDetails: listMouldDetails,
      listParts: listParts,
      create: create,
      updateMould: updateMould
    };

    return Mould;

    ///////////////////

    /**
     * @name login
     * @desc Try to log in with email `email` and password `password`
     * @param {string} email The email entered by the user
     * @param {string} password The password entered by the user
     * @returns {Promise}
     * @memberOf thinkster.authentication.services.Authentication
     */
    function listMoulds() {
      return $http.get('/api/v1/job-work/?format=json');
    }

    function listMould(id) {
      return $http.get('/api/v1/job-work/' + id + '/?format=json');
    }

    function listClients() {
      return $http.get('/api/v1/client/?format=json');
    }

    function listMouldTypes() {
      return $http.get('/api/v1/mould-type/?format=json');
    }

    function listMouldNo() {
      return $http.get('/api/v1/mould/?format=json');
    }

    function listMouldDetails() {
      return $http.get('/api/v1/mould-detail/?format=json');
    }

    function listParts() {
      return $http.get('/api/v1/part/?format=json');
    }

    function create(data) {
      return $http.post('/api/v1/job-work/', data);
    }

    function updateMould(data) {
      return $http.put('/api/v1/job-work/' + data.id +'/?format=json', data);
    }
     function deleteMould(id) {
      return $http.delete('/api/v1/job-work/' + id +'/?format=json');
    }
  }
})();
