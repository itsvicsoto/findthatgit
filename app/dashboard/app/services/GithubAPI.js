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
      },
      getSearchUsers: function(query) {
        return githubBaseUrl + '/search/users?q=' + query + '+type:USER';
      },
      getHTMLByUrl: function(url) {
        return url;
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
      },
      getSearchUsers: function(query) {
        var options = {
          url: GithubAPIEndpoints.getSearchUsers(query),
          method: 'GET'
        };

        return $http(options);
      },
      getHTMLByUrl: function(url) {
        var options = {
          url: GithubAPIEndpoints.getHTMLByUrl(url),
          method: 'GET'
        };

        return $http(options);
      }
    }
  }

})();