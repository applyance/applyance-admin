'use strict';

module.exports = angular.module('Admin')
  .controller('NewDefinitionCtrl', ['$scope', '$routeParams', 'Store', 'ApplyanceAPI',
    function ($scope, $routeParams, Store, ApplyanceAPI) {

      $scope.form = {
        saving: false
      };

      $scope.definition = {
        type: 'textarea',
        is_core: false
      };

      $scope.domain = null;
      $scope.domains = [];
      ApplyanceAPI.getDomains().then(function(domains) {
        $scope.domains = domains.plain();
      });

      $scope.onSave = function(definition) {
        $scope.form.saving = false;
      };

      $scope.save = function() {
        if (_.isEmpty($scope.definition) || !$scope.definition.label) {
          return;
        }
        $scope.form.saving = true;
        if ($scope.domain) {
          ApplyanceAPI.postDomainDefinition($scope.domain.id, $scope.definition).then($scope.onSave);
        } else {
          ApplyanceAPI.postDefinition($scope.definition).then($scope.onSave);
        }
      };

    }
  ]);
