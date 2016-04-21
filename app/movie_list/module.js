(function(angular) {
  'use strict';

  // 定义一个模块
  angular.module('MR.movie_list', ['ngRoute','MR.services','MR.directives'])

    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.when('/:category/:page?', {
        templateUrl: 'movie_list/view.html',
        controller: 'movie_listController'
      });
    }])

    .controller('movie_listController', [
      '$scope',
      'HttpService',
      '$routeParams',
      '$route',
      function($scope, HttpService,$routeParams,$route) {
        $scope.page = parseInt($routeParams.page || 1);
        var count = 5;
        var start = ($scope.page - 1) * count;
        $scope.title = 'Loading...';
        $scope.movies = [];
        $scope.loading = true;
        $scope.totalCount = 0;
        $scope.totalPage = 0;
        HttpService.jsonp(
          'http://api.douban.com/v2/movie/' + $routeParams.category,
          {
            start: start,
            count: count,
            q: $routeParams.q
          },
          function(data) {
            $scope.loading = false;
            $scope.totalCount = data.total;
            $scope.totalPage = Math.ceil(data.total/count);
            $scope.title = data.title;
            $scope.movies = data.subjects;
            $scope.$apply();
          });

        $scope.go = function(page) {
          if (0 < page && page < $scope.totalPage + 1) {
            $route.updateParams({page : page});
          }
        }
      }
    ]);

})(angular)
