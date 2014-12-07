'use strict';

angular.module('core').controller('HeaderController', [
	'$scope',
	'AuthenticationService',
	'$log',
	'$state',
	'Menus',
	function($scope, AuthenticationService, $log, $state, Menus) {

		$log= $log.getInstance('HeaderController');
		$scope.authentication = AuthenticationService;
		$scope.authentication.user = AuthenticationService.getUser();
		$scope.isAuthenticated = AuthenticationService.isAuthenticated();

		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});

		$scope.signout = function() {
			AuthenticationService.signout();
			$scope.isAuthenticated = false;
			$scope.authentication.user  = null;
		};
	}
]);
