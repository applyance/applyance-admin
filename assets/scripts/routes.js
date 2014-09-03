module.exports = function($routeProvider, $locationProvider, me, $routeParams) {

  $routeProvider
    .when('/accounts', {
      templateUrl: 'views/accounts.html',
      controller: 'AccountsCtrl'
    })
    .when('/entities', {
      templateUrl: 'views/entities.html',
      controller: 'EntitiesCtrl'
    })
    .when('/definitions', {
      templateUrl: 'views/definitions.html',
      controller: 'DefinitionsCtrl'
    })
    .when('/definitions/new', {
      templateUrl: 'views/definition.html',
      controller: 'NewDefinitionCtrl'
    })
    .when('/definitions/:id', {
      templateUrl: 'views/definition.html',
      controller: 'EditDefinitionCtrl'
    })
    .when('/domains', {
      templateUrl: 'views/domains.html',
      controller: 'DomainsCtrl'
    })
    .when('/domains/new', {
      templateUrl: 'views/domain.html',
      controller: 'NewDomainCtrl'
    })
    .when('/domains/:id', {
      templateUrl: 'views/domain.html',
      controller: 'EditDomainCtrl'
    })
    .otherwise({
      redirectTo: '/accounts'
    });

  $locationProvider.html5Mode(true);

};
