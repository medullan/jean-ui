'use strict';

// Setting up route
angular.module('core').config([
	'$stateProvider',
	'$urlRouterProvider',
	'CoreConstants',
	function($stateProvider, $urlRouterProvider, CoreConstants) {
		// Redirect to home view when route not found
		$urlRouterProvider.otherwise('/');

		// Home state routing
		$stateProvider.
		state('home', {
			url: '/',
			templateUrl: CoreConstants.modulesPath + '/core/views/home.client.view.html',
			controller: 'HomeCtrl'
		});

		$stateProvider.state('error',{
      url: '/error',
      templateUrl: CoreConstants.modulesPath + '/core/views/error.client.view.html',
      controller: 'SiteCtrl'
    });
	}
]);
