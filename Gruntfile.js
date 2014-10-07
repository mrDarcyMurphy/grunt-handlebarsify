/*
 * grunt-handlebars-requirejs
 *
 * Copyright (c) 2012 Darcy Murphy
 * Licensed under the MIT license.
 * https://github.com/mrDarcyMurphy/grunt-handlebars-requirejs/blob/master/LICENSE
 */

module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    jshint: {
      options: {
        asi: true,
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    handlebarsify: {
      basic: {
        files: {
          'tmp/basic/basic.js': ['test/fixtures/basic.hb']
        }
      },
      partialed: {
        options: {
          makePartials: true
        },
        files: {
          'tmp/partialed/basic.js': ['test/fixtures/basic.hb']
        }
      },
      expanded: {
        options: {
          makePartials: true
        },
        files: [{
          expand: true,
          cwd:    'test/fixtures/',
          src:    '**/*.hb',
          dest:   'tmp/expanded/',
          ext:    '.js'
        }]
      },
      assumedGlobal: {
        options: {
          makePartials: true,
          globalfallback: false
        },
        files: {
          'tmp/partialed/basic2.js': ['test/fixtures/basic.hb']
        }
      }
    },

    // Tests
    simplemocha: {
      files: ['test/*.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Testing
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'handlebarsify', 'simplemocha']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
