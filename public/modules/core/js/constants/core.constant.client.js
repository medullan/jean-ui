'use strict';

angular.module('core').constant('CoreConstants', (function(){
  var baseUrl = 'http://localhost:3000';
  var appName = ApplicationConfiguration.applicationModuleName;
  var envVars = null;

  if(angular.isDefined(window.__env)){
    envVars = window.__env;
  }

  //Default values for CoreConstants
  var constant = {
    modulesPath: '/modules',
    serverBaseUrl: baseUrl,
    appName: appName,
    tokenIdentifier: 'token',
    userInfoIdentifier: 'uinf'
  };

  //Extend Core Constants with Env Variables from superstatic
  //The 'requiredEnv' property is used to determine which
  //sub-object (env. variables) to use within CoreConstants
  if(angular.isObject(envVars) &&
      envVars.requiredEnv &&
      envVars.hasOwnProperty(envVars.requiredEnv)  ){

    constant = angular.extend(constant, envVars[envVars.requiredEnv]);
    constant.envName = envVars.requiredEnv;
  }

  //Computed values
  constant.apiBaseUrl = constant.serverBaseUrl + '/api';

  return constant;
})());
