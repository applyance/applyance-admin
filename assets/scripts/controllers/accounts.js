'use strict';

module.exports = angular.module('Admin')
  .controller('AccountsCtrl', ['$scope', 'Store', 'ApplyanceAPI',
    function ($scope, Store, ApplyanceAPI) {

      $scope.accounts = [];
      ApplyanceAPI.getAccounts().then(function(accounts) {
        $scope.accounts = _.map(accounts, function(account) {
          account.roles = _.pluck(account.roles, "name").join(", ");
          return account;
        });
      });

    }
  ]);
