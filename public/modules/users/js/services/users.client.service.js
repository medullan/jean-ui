'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
	'$resource',
	'CoreConstants',
	function($resource, CoreConstants) {
		return $resource(CoreConstants.apiBaseUrl + 'users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
