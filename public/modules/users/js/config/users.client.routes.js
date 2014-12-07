'use strict';

// Setting up route
angular.module('users').config([
	'$stateProvider',
	'CoreConstants',
	function($stateProvider, CoreConstants) {

		var prefix = CoreConstants.modulesPath + '/users';
		// Users state routing
		$stateProvider.
		state('signup', {
			url: '/signup',
			templateUrl: prefix + '/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: prefix + '/views/authentication/signin.client.view.html'
		});
	}
]);
