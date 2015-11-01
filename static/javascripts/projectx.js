(function () {
  'use strict';

  angular
    .module('projectx', [
      'projectx.config',
      'projectx.routes',
      'projectx.mould',
      'projectx.layout',
      'smart-table'
    ]);

    angular
  .module('projectx.config', []);

  angular
    .module('projectx.routes', ['ngRoute']);

  angular
    .module('projectx')
    .run(run);

  run.$inject = ['$http'];

  /**
   * @name run
   * @desc Update xsrf $http headers to align with Django's defaults
   */
  function run($http) {
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';
  }
})();
