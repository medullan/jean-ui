'use strict';

var shelljs = require('shelljs');
var format = require('string-template');
var request = require('request');
var _ = require('lodash');

module.exports = function(grunt){
  //add custom grunt tasks here
  var getPort = function(){
    var port = grunt.option( 'port' ) || 9000;
    if(grunt.option( 'host' ) && !grunt.option( 'port' )){
      port = 80;
    }
    return port;
  };

  // A task for generating documentation using doxx CLI
  grunt.task.registerTask('startApp', 'documentation', function() {
    var options = {
      port: getPort()
    };

    var template = './node_modules/harp/bin/harp server --port {port} ';
    var command = format(template, options);
    var result = shelljs.exec(command);

    if(result.code === 0){
      grunt.log.ok(this.name + ' - successful');
    }else{
      grunt.log.error(this.name + ' - ERROR: something went wrong!');
    }
  });
};
