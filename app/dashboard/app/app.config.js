(function() {
  'use strict';

  angular
    .module('findthatgit.config', [])
    .run(run)
    .config(config)
  // .provider('logEnhancer', logEnhancer);

  run.$inject = ['$rootScope'];

  /* @ngInject */
  function run($rootScope) {
    console.log('====== APP RUN ========');

    // logEnhancer.enhanceAngularLog($log);

    console.log('====== END RUN ========');
  }

  config.$inject = ['$locationProvider', '$urlRouterProvider'];

  /* @ngInject */
  function config($locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode(true);

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise(function() {
      window.location.href = '/page-not-found';
    });

  }


})();