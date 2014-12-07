'use strict';

angular.module('core').controller('SiteCtrl', [
  '$scope',
  '$document',
  '$rootScope',
  '$log',
  '$state',
  'AuthenticationService',
  function($scope, $document, $rootScope, $log, $state, AuthenticationService){
      $document.on('scroll', function() {
        var headerBottom = angular.element(document.getElementById('header-bottom'));
        if($document.scrollTop() > 300){
          headerBottom.addClass('fixed');
        }else{
          headerBottom.removeClass('fixed');
        }
      });

      $rootScope.$on('$stateChangeError', function(_event, toState, toParams, fromState, fromParams, error){
         $state.transitionTo('error');
        $log.log('could not change routes (server down): ', _event, toState, toParams, fromState, fromParams, error);
        $scope.previousUrl = fromState.url;
      });

    }
]);
