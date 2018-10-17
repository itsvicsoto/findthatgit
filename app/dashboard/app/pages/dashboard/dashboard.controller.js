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
    vm.actions.searchUser = actions_searchUser;
    vm.actions.searchRepo = actions_searchRepo;

    vm.actions.showRepo = actions_showRepo;

    vm.ui = {};

    vm.models = {};
    vm.models.searcher = '';
    vm.models.reposResult;

    function actions_showRepo(userDetails) {

      // Update the UI displa state
      vm.ui.selectedUser = userDetails;

      // Search repository by selected user
      vm.actions.searchRepo(userDetails.login);

      // Reset UI
      // vm.models.searcher = '';
      vm.models.searchUsersResult = {};

    }

    function actions_searchUser(query) {
      GithubAPI.getSearchUsers(query).then(function(result) {
        vm.models.searchUsersResult = result;
      });
    }

    function actions_searchRepo(username) {
      GithubAPI.getAllRepoByUsername(username).then(function(result) {
        vm.models.reposResult = result;
      });
    }


  }

})();