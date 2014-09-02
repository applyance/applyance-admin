'use strict';

module.exports = angular.module('Admin')
  .controller('EntitiesCtrl', ['$scope', 'Store', 'ApplyanceAPI',
    function ($scope, Store, ApplyanceAPI) {

      $scope.entities = [];
      ApplyanceAPI.getAllEntities().then(function(entities) {
        $scope.entities = entities.plain();
      });

    }
  ]);
