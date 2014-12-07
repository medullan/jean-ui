'use strict';


angular.module('core').controller('HomeCtrl', ['$scope', 'AuthenticationService',
	function($scope, AuthenticationService) {
		// This provides Authentication context.
		$scope.authentication = AuthenticationService;
		$scope.isAuthenticated = AuthenticationService.isAuthenticated();
		$scope.authentication.user = AuthenticationService.getUser();
		

	}
]);
