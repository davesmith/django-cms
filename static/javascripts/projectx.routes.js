(function () {
  'use strict';

  angular
    .module('projectx.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
   * @name config
   * @desc Define valid application routes
   */
  function config($routeProvider) {
    $routeProvider.when('/', {
      controller: 'MouldController', 
      controllerAs: 'vm',
      templateUrl: '/static/templates/layout/index.html'
    }).when('/mould', {
      controller: 'MouldController', 
      controllerAs: 'vm',
      templateUrl: '/static/templates/mould/mould.html'
    }).otherwise('/');
  }
})();
