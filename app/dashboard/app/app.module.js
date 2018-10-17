(function() {
  'use strict';

  angular
    .module('findthatgit', [

      // 3rd party
      'hljs',
      
      // App Core
      'findthatgit.routes',
      'findthatgit.config',
      'findthatgit.constant',
      'findthatgit.GithubAPI',

      // App Pages
      'findthatgit.dashboard'

      // App Components

    ])
    .controller('MainController', MainController);

  MainController.$inject = ['$scope'];

  /* @ngInject */
  function MainController($scope) {
    var vm = $scope;
  }

})();