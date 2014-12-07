'use strict';
var grunt = require('grunt');
module.exports = function(watchFiles){
  //get meta data from grunt config
  var metaData = grunt.config.getRaw('meta');
  //var watchFiles = metaData.files;

  var inject = {
    options: {
      //ignorePath: ['public/']
    },
    app_js: {
      options: {
        ignorePath: ['public/']
      },
      files: {
        'public/_layout.ejs': watchFiles.clientJS,
      }
    },
    app_css: {
      options: {
        ignorePath: ['public/']
      },
      files: {
        'public/_layout.ejs': watchFiles.clientCSS,
      }
    },
    testfiles:{
      options:{
        starttag: '[',
        endtag: ']',
        addRootSlash: false,
        transform: function(filepath, index , length){
          var value = '\'' + filepath + '\',\n';
          if(value.indexOf('.js') !== -1){
            return value;
          }
          return null;
        },
        lineEnding: ''
      },
      files: {
        'config/grunt/files.js': ['bower.json']
      }
    },
    bowerCSS:{
      options:{
        starttag: '[',
        endtag: ']',
        addRootSlash: false,
        transform: function(filepath, index , length){
          var value = '\'' + filepath + '\',\n';
          if(value.indexOf('.css') !== -1){
            return value;
          }
          return null;
        },
        lineEnding: ''
      },
      files: {
        'config/grunt/bower-css-files.js': ['bower.json']
      }
    }
  };
  return inject;
};
