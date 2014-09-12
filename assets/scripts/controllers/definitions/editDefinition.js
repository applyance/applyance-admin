'use strict';

module.exports = angular.module('Admin')
  .controller('EditDefinitionCtrl', ['$scope', '$routeParams', 'Store', 'ApplyanceAPI',
    function ($scope, $routeParams, Store, ApplyanceAPI) {

      $scope.form = {
        saving: false
      };

      $scope.domain = null;
      $scope.originalDomain = null;
      $scope.domains = [];

      $scope.definitionTypes = [
        { id: "text", name: "Short Text" },
        { id: "textarea", name: "Long Text" },
        { id: "fileupload", name: "File Upload" }
      ];

      $scope.onGetDomains = function(domains) {
        $scope.domains = domains.plain();
        ApplyanceAPI.getDefinition($routeParams.id).then($scope.onGetDefinition);
      };
      ApplyanceAPI.getDomains().then($scope.onGetDomains);

      $scope.onGetDefinition = function(definition) {
        $scope.definition = definition.plain();
        if ($scope.definition.domain) {
          $scope.domain = _.findWhere($scope.domains, { id: $scope.definition.domain.id });
          $scope.originalDomain = angular.copy($scope.domain);
        }
      };

      $scope.save = function() {
        $scope.form.saving = true;
        var domain_id = $scope.domain ? $scope.domain.id : -1;
        ApplyanceAPI.putDefinition(
          angular.extend($scope.definition, { domain_id: domain_id })
        ).then($scope.onSave);
      };

      $scope.onSave = function(definition) {
        $scope.form.saving = false;
      };

    }
  ]);
