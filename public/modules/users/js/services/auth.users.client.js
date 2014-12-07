'use strict';

// Authentication service for user variables
angular.module('users').service('AuthenticationService', [
  '$http',
  '$q',
  '$state',
  '$window',
  '$log',
  'store',
  'jwtHelper',
  'CoreConstants',

  function($http, $q, $state, $window, $log, store, jwtHelper, CoreConstants) {

    //*******************************
    // Private members
    //*******************************
    //var _this = this;
    $log= $log.getInstance('AuthenticationService');
    var cachedUser;
    var cachedToken;
    var tokenIdentifier = CoreConstants.tokenIdentifier;
    var userIdentifier = CoreConstants.userInfoIdentifier;

    var deferred = $q.defer();

    //var $state = $injector.get('$state');
    //var $http = $injector.get('$http');

    var authenticate = function(response){
      // If successful we assign the response to the global user model
      cachedUser = response.user;
      cachedToken = response.token;
      store.set(tokenIdentifier, response.token);
      store.set(userIdentifier, cachedUser);
      // And redirect to the index page
      //$state.go('home');

      // $log.log(response);
      deferred.resolve(response);
    };

    //*******************************
    // Public members
    //*******************************
    var setUser = function(user){
      cachedUser = user;
      $window.user = user;
    };
    var getUser = function(){
      if(!cachedUser){
        cachedUser = store.get(userIdentifier);
        return cachedUser;
      }
      return cachedUser;
    };

    var isAuthenticated = function(){
      if(!cachedToken ){

        cachedToken = store.get(tokenIdentifier);
        var isAuth = !!cachedToken;
        return isAuth;
      }else{
        cachedToken = store.get(tokenIdentifier);
        return true;
      }

    };

    var signout = function() {
      store.remove(tokenIdentifier);
      store.remove(userIdentifier);
      cachedToken = null;
      cachedUser = null;
      $state.go('home');
    };

    var signup = function(credentials) {

      $http.post(CoreConstants.serverBaseUrl + '/auth/signup', credentials)
      .success(authenticate)
      .error(function(response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    var signin = function(credentials) {
      $log.log('signin');
      //var deferred = $q.defer();
      $http.post(CoreConstants.serverBaseUrl + '/auth/signin', credentials)
      .success(authenticate)
      .error(function(response) {
        deferred.reject(response);
      });
      return deferred.promise;
    };

    //*******************************


    var _data = {
      user: cachedUser,
      setUser: setUser,
      getUser: getUser,
      isAuthenticated: isAuthenticated,
      signout: signout,
      signup: signup,
      signin: signin
    };

    return _data;
  }
]);
