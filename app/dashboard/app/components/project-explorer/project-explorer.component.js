(function() {
  'use strict';

  angular
    .module('findthatgit.component.projectExplorer', [])
    .component('projectExplorer', ProjectExplorerComponent())
    .controller('ProjectExplorerComponentController', ProjectExplorerComponentController);

  function ProjectExplorerComponent() {
    var component = {
      templateUrl: 'components/project-explorer/project-explorer.html',
      controller: ProjectExplorerComponentController,
      controllerAs: 'vm',
      bindings: {
        ui: '=',
        models: '='
      }
    }

    return component;
  }

  ProjectExplorerComponentController.$inject = ['$scope', 'GithubAPI'];

  function ProjectExplorerComponentController($scope, GithubAPI) {
    var vm = this;

    this.$onInit = function() {

    }

    vm.actions = {};
    vm.actions.showReadme = actions_showReadme;

    function actions_showReadme(repoDetails) {

      // Update the UI display state
      vm.ui.selectedRepo = repoDetails;
      vm.ui.selectedReadme = false;

      var url = 'https://raw.githubusercontent.com/' + vm.ui.selectedRepo.full_name + '/master/README.md';

      GithubAPI.getHTMLByUrl(url).then(function(result) {
        vm.ui.selectedReadme = result;
      });

    }


  }

})();