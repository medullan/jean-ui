'use strict';
/**
* @ngdoc controller
* @name mean.controller:AuthenticationController
*
* @description
* Resize textarea automatically to the size of its text content.
*
* **LastModifiedBy:** Layton Whiteley
*
* **Note:** ie<9 needs pollyfill for window.getComputedStyle
* @example
	<div >
		<div ng-contoller="AuthenticationController">

		</div>
	</div>
*/
angular.module('users').controller('AuthenticationController', [
	'$scope',
	'AuthenticationService',
	'$log',
	'$state',
	'$http',
	function($scope,  AuthenticationService, $log, $state, $http) {
		$log= $log.getInstance('AuthenticationController');
		$scope.authentication = AuthenticationService;
		$scope.isAuthenticated = AuthenticationService.isAuthenticated();
		$scope.authentication.user = AuthenticationService.getUser();

		// If user is signed in then redirect back home
		if ($scope.isAuthenticated){
			// $log.log('onload auth', $scope.authentication.user );
			$state.go('home');
		}
		var authenticate = function(response){
			// If successful we assign the response to the global user model
			$scope.authentication.user = response.user;
			$scope.isAuthenticated = true;
			// $log.log('inside final auth', response);
			$state.go('home');
		};

		$scope.signup = function() {
			AuthenticationService.signup($scope.credentials)
			.then(
				authenticate,
				function(response) {
					$scope.error = response.message;
			});
		};
        /*
        This functinon is specific to sign up for a dealer.
         */
        $scope.dealersignup = function() {
            $http.post('/auth/signup', $scope.credentials).success(function(response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;
                //Once successful this will create the dealer object
                $http.post('/dealers', $scope.dealer).success(function(response) {

                }).error(function(response){
                    $scope.error = response.message;
                });
                // And redirect to the index page
								$state.go('home');
            }).error(function(response) {
                $scope.error = response.message;
            });
        };

		$scope.signin = function() {
			AuthenticationService.signin($scope.credentials)
			.then(
				authenticate,
				function(response) {
					$scope.error = response.message;
			});
		};

	}
]);
