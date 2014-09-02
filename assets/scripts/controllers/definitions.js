'use strict';

module.exports = angular.module('Admin')
  .controller('DefinitionsCtrl', ['$scope', 'Store', 'ApplyanceAPI',
    function ($scope, Store, ApplyanceAPI) {

      $scope.definitions = [];
      ApplyanceAPI.getDefinitions().then(function(definitions) {
        $scope.definitions = definitions.plain();
      });

    }
  ]);
