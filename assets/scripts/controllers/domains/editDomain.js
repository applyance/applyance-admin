'use strict';

module.exports = angular.module('Admin')
  .controller('EditDomainCtrl', ['$scope', '$routeParams', 'Store', 'ApplyanceAPI',
    function ($scope, $routeParams, Store, ApplyanceAPI) {

      $scope.form = {
        saving: false
      };

      ApplyanceAPI.getDomain($routeParams.id).then(function(domain) {
        $scope.domain = domain.plain();
      });

      $scope.save = function() {
        $scope.form.saving = true;
        ApplyanceAPI.putDomain($scope.domain).then(function(domain) {
          $scope.form.saving = false;
        });
      };

    }
  ]);
