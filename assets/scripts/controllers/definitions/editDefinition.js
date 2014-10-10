'use strict';

module.exports = angular.module('Admin')
  .controller('EditDefinitionCtrl', ['$scope', '$routeParams', 'Store', 'ApplyanceAPI',
    function ($scope, $routeParams, Store, ApplyanceAPI) {

      $scope.definitionTypes = [
        { id: "shorttext", name: "Short Text" },
        { id: "longtext", name: "Long Text" },
        { id: "dropdown", name: "Dropdown" },
        { id: "fileupload", name: "File Upload" },
        { id: "multiplechoice", name: "Multiple Choice" },
        { id: "yesno", name: "Yes/No" },
        { id: "rating", name: "Rating" },
        { id: "date", name: "Date" },
        { id: "name", name: "Name" },
        { id: "email", name: "Email" },
        { id: "website", name: "Website" },
        { id: "socialsecuritynumber", name: "Social Security Number" },
        { id: "phonenumber", name: "Phone Number" },
        { id: "address", name: "Address" },
        { id: "legal", name: "Legal" },
        { id: "education", name: "Education" },
        { id: "workexperience", name: "Work Experience" },
        { id: "hourlyavailability", name: "Hourly Availability" },
        { id: "reference", name: "Reference" }
      ];

      $scope.form = {
        saving: false
      };

      $scope.domain = null;
      $scope.originalDomain = null;
      $scope.domains = [];

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
        var domain_id = $scope.domain ? $scope.domain.id : -1;

        var helper = $scope.definition.helper;
        if (!helper) {
          helper = null;
        } else if (typeof helper === 'string') {
          try {
            helper = JSON.parse(helper);
          } catch(e) {
            alert('JSON error in helper.');
            return;
          }
        }
        $scope.definition.helper = helper;

        $scope.form.saving = true;
        ApplyanceAPI.putDefinition(
          angular.extend($scope.definition, { domain_id: domain_id })
        ).then($scope.onSave);
      };

      $scope.onSave = function(definition) {
        $scope.form.saving = false;
      };

    }
  ]);
