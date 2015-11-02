(function () {
  'use strict';

  angular
    .module('projectx.routes')
    .config(config);

  config.$inject = ['$stateProvider'];

  /**
   * @name config
   * @desc Define valid application routes
   */
  function config($stateProvider) {
     $stateProvider
      .state('mould', {
        url: '/',
        controller: 'MouldController',
        templateUrl: "/static/templates/mould/moulds.html"
      })
      .state('newMould', {
        url: '/mould/new',
        controller: 'NewMouldController', 
        templateUrl: '/static/templates/mould/new-mould.html'
      })
      .state('editMould', {
        url: '/mould/edit/{mouldId}',
        controller: 'NewMouldController', 
        templateUrl: '/static/templates/mould/new-mould.html'
      });
  }
})();
