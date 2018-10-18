(function() {
  'use strict';

  angular
    .module('findthatgit.component.searcher', [])
    .component('searcher', SearcherComponent())
    .controller('SearcherComponentController', SearcherComponentController);

  function SearcherComponent() {
    var component = {
      templateUrl: 'components/searcher/searcher.html',
      controller: SearcherComponentController,
      controllerAs: 'vm',
      bindings: {
        ui: '=',
        models: '='
      }
    }

    return component;
  }

  SearcherComponentController.$inject = ['$scope', 'GithubAPI'];

  function SearcherComponentController($scope, GithubAPI) {
    var vm = this;

    this.$onInit = function() {

    }

    vm.actions = {};
    vm.actions.searchUser = actions_searchUser;
    vm.actions.showRepo = actions_showRepo;
    vm.actions.searchRepo = actions_searchRepo;


    function actions_searchRepo(username) {
      GithubAPI.getAllRepoByUsername(username).then(function(result) {
        vm.models.reposResult = result;
      });
    }

    function actions_searchUser(query) {

      vm.models.searchUsersResult = {};
      vm.ui.selectedRepo = false;

      GithubAPI.getSearchUsers(query).then(function(result) {
        vm.models.searchUsersResult = result;
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

  }

})();