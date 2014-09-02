'use strict';

module.exports = angular.module('Admin')
  .controller('DomainsCtrl', ['$scope', 'Store', 'ApplyanceAPI',
    function ($scope, Store, ApplyanceAPI) {

      $scope.domains = [];
      ApplyanceAPI.getDomains().then(function(domains) {
        $scope.domains = domains.plain();
      });

    }
  ]);
