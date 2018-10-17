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
    vm.actions.showReadme = actions_showReadme;

    vm.ui = {};

    vm.models = {};
    vm.models.searcher = '';
    vm.models.reposResult;

    function actions_showReadme(repoDetails) {

      // Update the UI display state
      vm.ui.selectedRepo = repoDetails;
      vm.ui.selectedReadme = false;

      var url = 'https://raw.githubusercontent.com/' + vm.ui.selectedRepo.full_name + '/master/README.md';

      GithubAPI.getHTMLByUrl(url).then(function(result) {
        vm.ui.selectedReadme = result;
      });

    }

    function actions_showRepo(userDetails) {

      // Update the UI displa state
      vm.ui.selectedUser = userDetails;

      // Search repository by selected user
      vm.actions.searchRepo(userDetails.login);

      // Reset UI
      // vm.models.searcher = '';
      vm.models.searchUsersResult = {};
      vm.ui.selectedRepo = false;

    }

    function actions_searchUser(query) {

      vm.models.searchUsersResult = {};
      vm.ui.selectedRepo = false;
      
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