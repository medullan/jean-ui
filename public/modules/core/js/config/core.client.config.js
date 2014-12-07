'use strict';

// Setting up route
angular.module('core').config([
  '$httpProvider',
  'jwtInterceptorProvider',
  'CoreConstants',
  function($httpProvider, jwtInterceptorProvider, CoreConstants) {
    jwtInterceptorProvider.tokenGetter = function(store) {
      return store.get('token');
    };

    $httpProvider.interceptors.push('jwtInterceptor');

  }
]);
