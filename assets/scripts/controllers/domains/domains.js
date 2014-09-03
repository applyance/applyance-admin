'use strict';

module.exports = angular.module('Admin')
  .controller('DomainsCtrl', ['$scope', 'Store', 'ApplyanceAPI',
    function ($scope, Store, ApplyanceAPI) {

      $scope.domains = [];
      ApplyanceAPI.getDomains().then(function(domains) {
        $scope.domains = domains.plain();
      });

      $scope.remove = function(domain) {
        ApplyanceAPI.deleteDomain(domain.id).then(function() {
          $scope.domains.splice($scope.domains.indexOf(domain), 1);
        });
      };

    }
  ]);
