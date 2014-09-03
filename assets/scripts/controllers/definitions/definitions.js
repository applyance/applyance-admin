'use strict';

module.exports = angular.module('Admin')
  .controller('DefinitionsCtrl', ['$scope', 'Store', 'ApplyanceAPI',
    function ($scope, Store, ApplyanceAPI) {

      $scope.definitions = [];
      ApplyanceAPI.getDefinitions().then(function(definitions) {
        $scope.definitions = definitions.plain();
      });

      $scope.remove = function(definition) {
        ApplyanceAPI.deleteDefinition(definition.id).then(function() {
          $scope.definitions.splice($scope.definitions.indexOf(definition), 1);
        });
      };

    }
  ]);
