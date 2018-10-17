(function() {
  'use strict';

  angular
    .module('findthatgit.dashboard', [])
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', 'GithubAPI'];

  /* @ngInject */
  function DashboardController($scope, GithubAPI) {
    var vm = this;

    vm.actions = {};
    vm.actions.searchRepo = actions_searchRepo;

    vm.models = {};
    vm.models.searcher = '';
    vm.models.reposResult;

    function actions_searchRepo(username) {
      GithubAPI.getAllRepoByUsername(username).then(function(result) {
        vm.models.reposResult = result;
      });
    }


  }

})();