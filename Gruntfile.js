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
          // folder : files
          // files will be converted into modules and dumped into the folder
          'tmp/basic/': ['test/fixtures/basic.hbs']
        }
      },
      partialed: {
        options: {
          makePartials: true
        },
        files: {
          // folder : files
          // files will be converted into modules and dumped into the folder
          'tmp/partialed/': ['test/fixtures/basic.hbs']
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

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'handlebarsify', 'simplemocha']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
};
