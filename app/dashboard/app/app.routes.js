(function() {
  'use strict';

  angular
    .module('findthatgit.routes', [
      'findthatgit.constant',
      'findthatgit.templates',
      'ui.router'
    ])
    .config(config);

  config.$inject = ['$stateProvider'];

  /* @ngInject */
  function config($stateProvider) {

    $stateProvider
      .state('main', {
        url: '/',
        abstract: true,
        controller: 'MainController',
        controllerAs: 'vm',
        resolve: {},
        views: {}
      })
      .state('main.home', {
        url: '/',
        data: {},
        views: {
          '@': {
            templateUrl: 'modules/dashboard/dashboard.html',
            controller: 'DashboardController',
            controllerAs: 'vm'
          }
        }
      })

  }

})();