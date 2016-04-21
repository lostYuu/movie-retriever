/**
 * Created by lost yu on 2016/4/20.
 */
;(function(angular) {
  angular.module('MR.services',[])
  .service('HttpService', ["$window", function($window) {
      this.jsonp = function(url, params, callback) {
        var callbackName = "jsonp_" + Math.random().toString().substr(2);
        $window[callbackName] = function(data) {
          callback(data);
          $window.document.body.removeChild(scriptElement);
        }
        var queryString = '';
        for(var key in params) {
          queryString += key + "=" + params[key] + "&";
        }
        queryString += "callback=" + callbackName;
        var scriptElement = $window.document.createElement('script');
        scriptElement.src = url + "?" + queryString;
        $window.document.body.appendChild(scriptElement);
      }
    }]);
})(angular);
