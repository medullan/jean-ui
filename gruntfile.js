'use strict';

module.exports = function(grunt) {
// Unified Watch Object
//var bowerFiles = require('bower-files')();
var watchFiles = {
  clientViews: ['public/modules/**/views/**/*.html'],
  clientJS: ['public/*.js','public/modules/*/js/*.js', 'public/modules/*/js/**/*.js'],
  clientCSS: ['public/modules/**/*.css'],
  tests: [
  'public/lib/bower_components/angular-mocks/angular-mocks.js',
  'public/modules/*/tests/unit/**/*.js'
  ],
  serverJS: ['gruntfile.js', 'config/**/*.js'],
  serverJSON: ['harp.json', 'package.json', 'bower.json', 'public/**/*.json', 'config/**/*.json' ],
  serverViews: ['public/*.ejs', 'public/views/**/*.ejs'],
  bowerJS: require('./config/grunt/files'),
  bowerCSS: require('./config/grunt/bower-css-files')
};

// Project Configuration
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta:{
      reports: '.reports',
      files: watchFiles
    },
    watch: {
      serverJSON: {
        files: watchFiles.serverJSON,
        tasks: ['jsonlint'],
        options: {
          livereload: true
        }
      },
      clientViews: {
        files: watchFiles.clientViews,
        options: {
          livereload: true,
        }
      },
      serverViews: {
        files: watchFiles.serverViews,
        tasks: ['inject'],
        options: {
          livereload: true,
        }
      },
      clientJS: {
        files: watchFiles.clientJS,
        tasks: ['jshint', 'inject'],
        options: {
          livereload: true
        }
      },
      clientCSS: {
        files: watchFiles.clientCSS,
        tasks: ['csslint', 'inject'],
        options: {
          livereload: true
        }
      }
    },
    jshint: {
      all: {
        src: watchFiles.clientJS.concat(watchFiles.serverJS),
        options: {
          jshintrc: true
        }
      }
    },
    jsonlint: {
      server: {
        src:watchFiles.serverJSON
      }
    },
    csslint: {
      options: {
        csslintrc: '.csslintrc',
      },
      all: {
        src: watchFiles.clientCSS
      }
    },
    uglify: {
      production: {
        options: {
          mangle: false
        },
        files: {
          'public/dist/application.min.js': 'public/dist/application.js',
          'public/dist/vendor.min.js': '<%= meta.files.bowerJS %>'
        }
      }
    },
    cssmin: {
      combine: {
        files: {
          'public/dist/application.min.css': '<%= meta.files.clientCSS %>',
          'public/dist/vendor.min.css': '<%= meta.files.bowerCSS %>'
        }
      }
    },
    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      production: {
        files: {
          'public/dist/application.js': ['<%= meta.files.clientJS %>']
        }
      }
    },
    concurrent: {
      docs: ['ngdocs', 'plato'],
      serve: ['startApp', 'watch'],
      test: ['test'],
      options: {
        logConcurrentOutput: true,
        limit: 6
      }
    },
    env: {
      test: {
        NODE_ENV: 'test'
      },
      dev: {
        NODE_ENV: 'development',
        COVERAGE: 'true'
      }
    },
    karma: {
      unit: {
        configFile: './config/karma.conf.js'
      }
    },
    ngdocs: {
      options: {
        dest: '<%= meta.reports %>/docs/ngdocs',
        scripts: [
        'public/lib/bower_components/angular/angular.js',
        'public/lib/bower_components/angular-animate/angular-animate.js'
        ],
        html5Mode: false,
        startPage: '/api',
        title: 'NgApp Documentation',
      },
      api: {
        src: watchFiles.clientJS,
        title: 'API Documentation'
      }
    },
    clean: {
      docs: ['<%= meta.reports %>/docs'],
      coverage: ['<%= meta.reports %>/coverage']
    },
    plato: {
      ui: {
        options:{
          //generate patterns: http://www.jslab.dk/tools.regex.php
          // regex's separated by pipe |
          // this pattern excludes tests, distributions and public libs
          exclude: /public\/lib|public\/modules\/([^/]+)\/tests|public\/dist/,
          jshint : grunt.file.readJSON('.jshintrc')
        },
        files: {
          '<%= meta.reports %>/plato/ui': [ 'public/**/*.js']
        }
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json','bower.json', 'CHANGELOG.md', 'gruntfile.js'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: '<%= pkg.repository.url %>',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false
      }
    },
    changelog:{
      options: {
        // Task-specific options go here.
      }
    },
    bowerInstall: {
      index:{
        src:['public/_layout.ejs'],
        ignorePath: ['public/']
      }
    },
    usemin: {
      html: 'public/_layout.ejs'
    },
    injector: require('./config/grunt/inject')(watchFiles)

  });

  // Load NPM tasks
  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);
  require('./config/grunt/customTasks')(grunt);

  // Making grunt default to force in order not to break the project.
  //grunt.option('force', true);

  // Default task(s).
  grunt.registerTask('default', ['lint', 'inject', 'inject:resources']);
  grunt.registerTask('serve', ['default', 'concurrent:serve']);

  grunt.registerTask('build', ['lint','inject', 'inject:resources', 'ngAnnotate', 'uglify', 'cssmin', 'usemin']);

  // Lint task(s).
  grunt.registerTask('lint', ['jshint', 'csslint', 'jsonlint']);

  // Injection tasks
  grunt.registerTask('inject', ['injector:appfiles', 'bowerInstall']);
  grunt.registerTask('inject:resources', ['injector:testfiles', 'injector:bowerCSS']);

  // Test task.
  grunt.registerTask('test', ['env:test', 'injector:testfiles', 'clean:coverage', 'lint', 'karma:unit']);

  grunt.registerTask('docs', ['clean:docs', 'concurrent:docs' ]);

  //release
  grunt.registerTask('pre-release', ['changelog', 'bump:prerelease']);
  grunt.registerTask('patch-release', ['changelog', 'bump']);
  grunt.registerTask('minor-release', ['changelog', 'bump:minor']);
  grunt.registerTask('major-release', ['changelog', 'bump:major']);

};
