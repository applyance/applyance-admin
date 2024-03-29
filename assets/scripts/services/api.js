'use strict';

module.exports = angular.module('Admin')
  .factory('ApplyanceAPI', ['$http', 'Restangular', 'apiHost', 'apiKey',
    function($http, Restangular, apiHost, apiKey) {

      Restangular.setBaseUrl(apiHost);
      $http.defaults.headers.common['Content-Type'] = "application/json";

      if (apiKey) {
        Restangular.setDefaultHeaders({ 'Authorization': "ApplyanceLogin auth=" + apiKey });
        $http.defaults.headers.common['Authorization'] = "ApplyanceLogin auth=" + apiKey;
      }

      this.getApiHost = function() {
        return apiHost;
      };
      this.setApiKey = function(apiKey) {
        Restangular.setDefaultHeaders({ 'Authorization': "ApplyanceLogin auth=" + apiKey });
        $http.defaults.headers.common['Authorization'] = "ApplyanceLogin auth=" + apiKey;
      };

      this.getMe = function() {
        return $http.get(apiHost + "/accounts/me");
      };
      this.updateAccount = function(accountId, accountInfo) {
        return $http.put(apiHost + "/accounts/" + accountId, accountInfo);
      };

      // Domains
      this.getDomains = function() {
        return Restangular.all("domains").getList();
      };
      this.getDomain = function(id) {
        return Restangular.one("domains", id).get();
      };
      this.putDomain = function(domain) {
        return Restangular.one("domains", domain.id).customPUT(domain);
      };
      this.createDomain = function(domain) {
        return Restangular.all("domains").post(domain);
      };
      this.deleteDomain = function(id) {
        return Restangular.one("domains", id).remove();
      };

      // Accounts
      this.getAccounts = function() {
        return Restangular.all("accounts").getList();
      };
      this.checkForEmail = function(email) {
        return $http.get(apiHost + '/emails?email=' + email);
      };
      this.authenticate = function(auth) {
        var api = this;
        return $http.post(apiHost + '/accounts/auth', auth).success(function(me, status, headers, config) {
          var apiKey = headers('authorization').split('auth=')[1];
          api.setApiKey(apiKey);
          return me;
        });
      };
      this.postReviewer = function(entityId, reviewer) {
        return $http.post(apiHost + '/entities/' + entityId + '/reviewers', reviewer);
      }

      // Applications
      this.getAllApplications = function() {
        return Restangular.all('applications').getList();
      };
      this.getApplications = function(entityId) {
        return Restangular.one("entities", entityId).all("applications").getList();
      };
      this.getApplication = function(id) {
        return Restangular.one('applications', id).get();
      };
      this.postApplication = function(application) {
        return Restangular.all('applications').post(application);
      };
      this.getSpotApplications = function(spotId) {
        return Restangular.one("spots", spotId).all("applications").getList();
      };

      // Citizens
      this.getAllCitizens = function() {
        return Restangular.all("citizens").getList();
      };
      this.getCitizens = function(entityId) {
        return Restangular.one("entities", entityId).all("citizens").getList();
      };
      this.getCitizen = function(id) {
        return Restangular.one("citizens", id).get();
      };
      this.putCitizen = function(id, obj) {
        return $http.put(apiHost + "/citizens/" + id, obj);
      };
      this.getSpotCitizens = function(spotId) {
        return Restangular.one("spots", spotId).all("citizens").getList();
      };

      // Profiles
      this.getProfile = function(id) {
        return Restangular.one("profiles", id).get();
      };

      // Spots
      this.getSpots = function(entityId) {
        return Restangular.one("entities", entityId).all("spots").getList();
      };
      this.getSpot = function(id) {
        return Restangular.one('spots', id).get();
      };
      this.putSpot = function(spot) {
        return $http.put(apiHost + "/spots/" + spot.id, spot);
      };
      this.postSpot = function(entityId, spot) {
        return Restangular.one("entities", entityId).all("spots").post(spot);
      };
      this.deleteSpot = function(id) {
        return Restangular.one('spots', id).remove();
      };

      // Ratings
      this.getCitizenRatings = function(id) {
        return Restangular.one('citizens', id).all("ratings").getList();
      };
      this.postRating = function(id, rating) {
        return Restangular.one('citizens', id).all('ratings').post(rating);
      };
      this.putRating = function(rating) {
        return $http.put(apiHost + "/ratings/" + rating.id, rating);
      };

      // Attachments
      this.uploadAttachment = function(fileData, contentType) {
        return $http.post(apiHost + "/attachments", fileData, {
          headers: { 'Content-Type': contentType }
        });
      };

      // Entities
      this.getAllEntities = function() {
        return Restangular.all('entities').getList();
      };
      this.getEntity = function(id) {
        return Restangular.one('entities', id).get();
      };
      this.getEntities = function(id) {
        return Restangular.one('entities', id).all('entities').getList();
      };
      this.postEntity = function(id, entity) {
        return Restangular.one('entities', id).all('entities').post(entity);
      };
      this.postNewEntity = function(entity) {
        return Restangular.all('entities').post(entity);
      };
      this.deleteEntity = function(id) {
        return Restangular.one('entities', id).remove();
      };
      this.putEntity = function(entity) {
        return $http.put(apiHost + "/entities/" + entity.id, entity);
      };

      // Entity Customers
      this.getCustomerForEntity = function(id) {
        return Restangular.one('entities', id).one('customer').get();
      };
      this.getEntityCustomer = function(id) {
        return Restangular.all('entities').one('customers', id).get();
      };
      this.postEntityCustomer = function(id, customer) {
        return Restangular.one('entities', id).all('customers').post(customer);
      };
      this.putEntityCustomer = function(entityCustomer) {
        return $http.put(apiHost + "/entities/customers/" + entityCustomer.id, entityCustomer);
      };
      this.deleteEntityCustomer = function(id) {
        return Restangular.all('entities').one('customers', id).remove();
      };

      // Reviewers
      this.getReviewers = function(id) {
        return Restangular.one('entities', id).all('reviewers').getList();
      };
      this.deleteReviewer = function(id) {
        return Restangular.one('reviewers', id).remove();
      };
      this.putReviewer = function(reviewer) {
        return $http.put(apiHost + "/reviewers/" + reviewer.id, reviewer);
      };

      // Reviewer Invites
      this.getReviewerInvites = function(id) {
        return Restangular.one('entities', id).all('reviewers').all('invites').getList();
      };
      this.postReviewerInvite = function(id, invite) {
        return Restangular.one('entities', id).all('reviewers').all('invites').post(invite);
      };
      this.claimReviewerInvite = function(invite) {
        return $http.post("/reviewers/invites/claim", invite);
      };

      // Definitions
      this.getDefinitions = function() {
        return Restangular.all("definitions").getList();
      };
      this.getDefinition = function(id) {
        return Restangular.one("definitions", id).get();
      };
      this.deleteDefinition = function(id) {
        return Restangular.one("definitions", id).remove();
      };
      this.putDefinition = function(definition) {
        return Restangular.one("definitions", definition.id).customPUT(definition);
      };
      this.getEntityDefinitions = function(id) {
        return Restangular.one('entities', id).all('definitions').getList();
      };
      this.postEntityDefinition = function(id, definition) {
        return Restangular.one('entities', id).all('definitions').post(definition);
      };
      this.postDomainDefinition = function(id, definition) {
        return Restangular.one('domains', id).all('definitions').post(definition);
      };
      this.postDefinition = function(definition) {
        return Restangular.all('definitions').post(definition);
      };

      // Blueprints
      this.deleteBlueprint = function(id) {
        return Restangular.one('blueprints', id).remove();
      };
      this.getBlueprints = function(id) {
        return Restangular.one('entities', id).all('blueprints').getList();
      };
      this.postBlueprint = function(id, blueprint) {
        return Restangular.one('entities', id).all('blueprints').post(blueprint);
      };
      this.postBlueprints = function(id, blueprints) {
        return Restangular.one('entities', id).all('blueprints').post(blueprints);
      };
      this.getSpotBlueprints = function(id) {
        return Restangular.one('spots', id).all('blueprints').getList();
      };
      this.postSpotBlueprint = function(id, blueprint) {
        return Restangular.one('spots', id).all('blueprints').post(blueprint);
      };

      // Datums
      this.getDatums = function(id) {
        return Restangular.one('profiles', id).all('datums').getList();
      };
      this.putDatum = function(datum) {
        return Restangular.one("datums", datum.id).customPUT(datum);
      };

      // Spots
      this.getSpots = function(id) {
        return Restangular.one("entities", id).all("spots").getList();
      };

      // Labels
      this.getLabels = function(id) {
        return Restangular.one('entities', id).all('labels').getList();
      };
      this.postLabel = function(id, label) {
        return Restangular.one('entities', id).all('labels').post(label);
      };
      this.deleteLabel = function(id) {
        return Restangular.one('labels', id).remove();
      };
      this.putLabel = function(label) {
        return $http.put(apiHost + "/labels/" + label.id, label);
      };
      this.getCitizenLabels = function(id) {
        return Restangular.one('citizens', id).all('labels').getList();
      };

      return this;
    }])
;
