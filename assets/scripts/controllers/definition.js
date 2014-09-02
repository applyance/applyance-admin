'use strict';

module.exports = angular.module('Admin')
  .controller('DefinitionCtrl', ['$scope', '$routeParams', 'Store', 'ApplyanceAPI',
    function ($scope, $routeParams, Store, ApplyanceAPI) {

      $scope.form = {
        saving: false
      };

      ApplyanceAPI.getDefinition($routeParams.id).then(function(definition) {
        $scope.definition = definition.plain();
        console.dir($scope.definition);
      });

      $scope.save = function() {
        $scope.form.saving = true;
        ApplyanceAPI.putDefinition($scope.definition).then(function(definition) {
          $scope.form.saving = false;
          console.dir(definition);
        });
      };

    }
  ]);
