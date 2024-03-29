'use strict';

module.exports = angular.module('Admin')
  .controller('ApplicationCtrl', ['$scope', '$routeParams', 'Store', 'ApplyanceAPI',
    function ($scope, $routeParams, Store, ApplyanceAPI) {

      $scope.definitions = [];
      ApplyanceAPI.getDefinitions().then(function(definitions) {
        $scope.definitions = definitions.plain();
      });

      $scope.application = {};
      ApplyanceAPI.getApplication($routeParams.id).then(function(application) {
        $scope.application = application.plain();
        ApplyanceAPI.getEntityDefinitions($scope.application.entities[0].id).then(function(definitions) {
          $scope.definitions = $scope.definitions.concat(definitions.plain());
        });
      });


      $scope.changeDefinition = function(field) {
        ApplyanceAPI.putDatum({
          id: field.datum.id,
          definition_id: field.datum.definition.id
        });
      };

    }
  ]);
