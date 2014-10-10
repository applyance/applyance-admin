'use strict';

module.exports = angular.module('Admin')
  .directive('ngConfirmClick', [
    function() {
      return {
        link: function (scope, element, attr) {
          var msg = attr.ngConfirmClick || "Are you sure?";
          var clickAction = attr.confirmedClick;
          element.bind('click',function (e) {
            e.stopPropagation();
            if (window.confirm(msg)) {
              scope.$eval(clickAction)
            }
          });
        }
      };
    }
  ])
  .directive('jsonText', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {
          function out(data) {
            if (!data) {
              return "";
            }
            if (typeof data === 'object') {
              return JSON.stringify(data);
            } else {
              return data;
            }
          }
          ngModel.$formatters.push(out);

          scope.$watch(attr.ngModel, function(newValue) {
            element[0].value = out(newValue);
          }, true);
        }
    };
});
;
