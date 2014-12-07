'use strict';

(function() {
	// Authentication controller Spec
	describe('AuthenticationController', function() {
		// Initialize global variables
		var AuthenticationController,
		  AuthenticationService,
			scope,
			$httpBackend,
			$stateParams,
			$q,
			$location;

		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($injector, $controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _$q_, _AuthenticationService_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;
			AuthenticationService = _AuthenticationService_;//$injector.get('AuthenticationService');
			$q = _$q_;

			// Initialize the Authentication controller
			AuthenticationController = $controller('AuthenticationController', {
				$scope: scope,
				AuthenticationService:AuthenticationService
			});

		}));

		// afterEach(function() {
		// 	$httpBackend.verifyNoOutstandingExpectation();
		// 	$httpBackend.verifyNoOutstandingRequest();
		// });
		it('AuthenticationService.signup() should have been called', function() {
			spyOn(AuthenticationService, 'signup').and.callFake(function(input) {
				var deferred = $q.defer();
				deferred.resolve('mock');
				return deferred.promise;
			});
			scope.signup();
			expect(AuthenticationService.signup).toHaveBeenCalled();
		});

		it('AuthenticationService.signin() should have been called', function() {
			// Test expected GET request
			// $httpBackend.when('POST', '/auth/signin').respond(200, 'Fred');

			spyOn(AuthenticationService, 'signin').and.callFake(function(input) {
				var deferred = $q.defer();
				deferred.resolve('mock');
				return deferred.promise;
			});
			scope.signin();
			// $httpBackend.flush();

			// Test scope value
			// expect(scope.authentication.user).toEqual('Fred');
			expect(AuthenticationService.signin).toHaveBeenCalled();
		});

		
	});
}());
