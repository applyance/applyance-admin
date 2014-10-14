'use strict';

module.exports = angular.module('Admin')
  .controller('ApplicationsCtrl', ['$scope', 'Store', 'ApplyanceAPI',
    function ($scope, Store, ApplyanceAPI) {

      $scope.applications = [];
      ApplyanceAPI.getAllApplications().then(function(applications) {
        $scope.applications = applications.plain();
      });

      $scope.getAccount = function(application) {
        if (application.citizens.length == 0) {
          return "N/A";
        }
        return application.citizens[0].account;
      };

      $scope.getEntitiesString = function(application) {
        return _.pluck(application.entities, 'name').join(", ");
      };

    }
  ]);
