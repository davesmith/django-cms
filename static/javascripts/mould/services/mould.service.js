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
      listMoulds: listMoulds
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
  }
})();
