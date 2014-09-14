'use strict';

module.exports = angular.module('Admin')
  .controller('EntitiesCtrl', ['$scope', 'Store', 'ApplyanceAPI', 'client_url',
    function ($scope, Store, ApplyanceAPI, client_url) {

      $scope.entities = [];
      ApplyanceAPI.getAllEntities().then(function(entities) {
        $scope.entities = entities.plain();
      });

      $scope.applicationUrl = function(entity) {
        var url = "/";
        if (entity.parent) {
          url += entity.parent.slug + "/";
        }
        return client_url + url + entity.slug;
      };

    }
  ]);
