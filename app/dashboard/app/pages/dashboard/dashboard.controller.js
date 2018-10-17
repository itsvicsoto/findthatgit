(function() {
  'use strict';

  angular
    .module('findthatgit.dashboard', [])
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope'];

  /* @ngInject */
  function DashboardController($scope) {
    var vm = this;
  }

})();