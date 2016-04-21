(function(angular) {
  'use strict';

  // 定义一个模块
  angular.module('MR.movie_details', ['ngRoute','MR.services'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/details/:id', {
        templateUrl: 'movie_details/view.html',
        controller: 'MovieDetailsController'
      });
    }])

    .controller('MovieDetailsController', [
      '$scope',
      'HttpService',
      '$routeParams',
      function($scope, HttpService,$routeParams) {
        $scope.movie = {};
        $scope.loading = true;
        $scope.title = 'loading...';
        HttpService.jsonp(
          'http://api.douban.com/v2/movie/subject/' + $routeParams.id,
          {},
          function(data) {
            $scope.loading = false;
            $scope.title = data.title;
            $scope.movie = data;
            $scope.$apply();
          });

      }
    ]);

})(angular)
