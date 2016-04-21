(function(angular) {
  'use strict';

  // 主模块
  angular.module('MovieRetriever', [
    'ngRoute',
    'MR.directives',
    'MR.movie_details',
    'MR.movie_list'
  ])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.otherwise({ redirectTo: '/in_theaters' });
  }])
  .controller('searchController', ['$scope', '$route', function($scope,$route) {
      $scope.input = '';
      $scope.search = function() {
        $route.updateParams({category: 'search', q: $scope.input});
      }
    }]);

}(angular));
