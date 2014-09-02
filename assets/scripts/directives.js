'use strict';

module.exports = angular.module('Admin')
  .directive('focusOn', function() {
     return function(scope, elem, attr) {
        scope.$on(attr.focusOn, function(e) {
          elem[0].focus();
        });
     };
  })
;
