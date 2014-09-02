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
    .when('/definitions/:id', {
      templateUrl: 'views/definition.html',
      controller: 'DefinitionCtrl'
    })
    .when('/domains', {
      templateUrl: 'views/domains.html',
      controller: 'DomainsCtrl'
    })
    .otherwise({
      redirectTo: '/accounts'
    });

  $locationProvider.html5Mode(true);

};
