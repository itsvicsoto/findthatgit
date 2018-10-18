(function() {
  'use strict';

  angular
    .module('findthatgit.dashboard', [
      'findthatgit.component.searcher',
      'findthatgit.component.projectExplorer'
    ])
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', 'GithubAPI'];

  /* @ngInject */
  function DashboardController($scope, GithubAPI) {
    var vm = this;

    vm.ui = {};

    vm.models = {};
    vm.models.searcher = '';
    vm.models.reposResult;

  }

})();