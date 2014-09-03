'use strict';

module.exports = angular.module('Admin')
  .controller('NewDomainCtrl', ['$scope', 'ApplyanceAPI',
    function ($scope, ApplyanceAPI) {

      $scope.form = {
        saving: false
      };

      $scope.domain = {};

      console.log('in');

      $scope.save = function() {
        if (_.isEmpty($scope.domain)) {
          return;
        }
        $scope.form.saving = true;
        ApplyanceAPI.createDomain($scope.domain).then(function(domain) {
          $scope.form.saving = false;
          console.dir(domain.plain());
        });
      };

    }
  ]);
