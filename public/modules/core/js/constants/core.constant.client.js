'use strict';

angular.module('core').constant('CoreConstants', (function(){
  var baseUrl = 'http://localhost:3000';
  var appName = ApplicationConfiguration.applicationModuleName;

  // Access Environment Variables, if available
  var envVars = window.__env;
  var envName = window.__envName;

  //Default values for CoreConstants
  var constant = {
    modulesPath: '/modules',
    serverBaseUrl: baseUrl,
    appName: appName,
    tokenIdentifier: 'token',
    userInfoIdentifier: 'uinf'
  };

  //Extend CoreConstants with Env Variables from harp
  //The 'envName' variable is used to determine which
  //sub-object (env. variables) to use within CoreConstants
  if(angular.isObject(envVars) &&
      angular.isString(envName) &&
      envVars.hasOwnProperty(envName)  ){

    constant = angular.extend(constant, envVars[envName]);
    constant.envName = envName;
  }

  //Computed values
  constant.apiBaseUrl = constant.serverBaseUrl + '/api';

  return constant;
})());
