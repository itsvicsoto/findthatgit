(function() {
  'use strict';

  angular
    .module('findthatgit', [

      // App Core
      'findthatgit.routes',
      'findthatgit.config',
      'findthatgit.constant'

    ])
    .controller('MainController', MainController);

  MainController.$inject = ['$scope'];

  /* @ngInject */
  function MainController($scope) {
    var vm = $scope;
  }

})();