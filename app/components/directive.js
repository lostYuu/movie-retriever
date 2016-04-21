/**
 * Created by lost yu on 2016/4/21.
 */

;(function(angular) {
  angular.module('MR.directives',[])
    .directive('autoActive', ['$location',function($location) {
      return {
        link: function(scope, element, attributes) {

          var url = $location.url();
          scope.$location = $location;
          scope.$watch('$location.url()', function(now, old) {
            var alink = element.children().attr('href').substr(1);
            if(now.startsWith(alink)){
              element.parent().children().removeClass('attributes.autoActive');
              element.addClass('attributes.autoActive');
            }
          });
        }
      }
    }]);
})(angular);
