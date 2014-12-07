'use strict';

angular.module('core').service('BrowserTitleService', [function(){
    var setBrowserTitle = function(title){
        $('title').text(title);
    };

    var service = {
        setBrowserTitle: setBrowserTitle
    };

    return service;
}]);
