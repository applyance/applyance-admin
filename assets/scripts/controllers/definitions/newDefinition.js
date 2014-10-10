'use strict';

module.exports = angular.module('Admin')
  .controller('NewDefinitionCtrl', ['$scope', '$routeParams', 'Store', 'ApplyanceAPI',
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

      $scope.definition = {
        type: 'longtext',
        is_core: false,
        is_default: false,
        default_required: false,
        default_position: 10
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
        if ($scope.domain) {
          ApplyanceAPI.postDomainDefinition($scope.domain.id, $scope.definition).then($scope.onSave);
        } else {
          ApplyanceAPI.postDefinition($scope.definition).then($scope.onSave);
        }
      };

    }
  ]);
