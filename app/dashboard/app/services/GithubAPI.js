(function() {
  'use strict';

  angular.module('findthatgit.GithubAPI', [])
    .factory('GithubAPIEndpoints', GithubAPIEndpoints)
    .factory('GithubAPI', GithubAPI)


  function GithubAPIEndpoints() {
    var githubBaseUrl = 'https://api.github.com';

    return {
      getAllRepoByUsername: function(username) {
        return githubBaseUrl + '/users/' + username + '/repos';
      }
    }
  }

  GithubAPI.$inject = [
    '$http',
    'GithubAPIEndpoints'
  ];

  function GithubAPI($http, GithubAPIEndpoints) {
    return {
      getAllRepoByUsername: function(username) {
        var options = {
          url: GithubAPIEndpoints.getAllRepoByUsername(username),
          method: 'GET'
        };

        return $http(options);
      }
    }
  }

})();