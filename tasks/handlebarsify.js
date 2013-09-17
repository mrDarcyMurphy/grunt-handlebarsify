/*
 * grunt-handlebars-requirejs
 *
 * Copyright (c) 2012 Darcy Murphy
 * Licensed under the MIT license.
 * https://github.com/mrDarcyMurphy/grunt-handlebars-requirejs/blob/master/LICENSE
 */

module.exports = function(grunt) {
  'use strict';

  // TODO: ditch this when grunt v0.4 is released
  grunt.util = grunt.util || grunt.utils

  var _ = grunt.util._
  var helpers = require('grunt-lib-contrib').init(grunt);

  // filename conversion for templates
  var defaultProcessName = function(name) {
    name = name.substr(0, name.lastIndexOf('.'))
    return name
  };

  // filename conversion for partials
  var defaultProcessPartialName = function(filePath) {
    var pieces = _.last(filePath.split('/')).split('.');
    var name   = _(pieces).without(_.last(pieces)).join('.'); // strips file extension
    return name.substr(1, name.length);                       // strips leading _ character
  };

  grunt.registerMultiTask('handlebarsify', 'Compile Handlebars templates to browserify-able modules.', function() {

    var options = helpers.options(this);

    grunt.verbose.writeflags(options, 'Options');

    var compiled, srcFiles, src, filename, outputFilename, partialName
    var output = ""

    // assign filename transformation functions
    var processName = options.processName || defaultProcessName
    var processPartialName = options.processPartialName || defaultProcessPartialName

    // iterate files, processing partials and templates separately
    this.files.forEach(function(files) {
      srcFiles = grunt.file.expand(files.src);
      srcFiles.forEach(function(file) {
        src = grunt.file.read(file);

        try {
          compiled = require('handlebars').precompile(src);
          compiled = 'Handlebars.template('+compiled+')'; // Forcing wrap since we'll need it in the module
        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn('Handlebars failed to compile '+file+'.');
        }

        filename = processName(file);

        output  = ""
        output += "var glob = ('undefined' === typeof window) ? global : window;\n"
        output += "Handlebars = glob.Handlebars || require('handlebars');\n"
        output += "var template = " + compiled + "\n"
        if (options.makePartials) {
          partialName = filename.replace(/\//g,'.')
          output += "Handlebars.registerPartial('"+partialName+"', template)\n"
        }
        output += "module.exports = template\n"

        // TODO: could maybe test for a trailing slash on the files.dest here
        outputFilename = files.dest + filename + '.js'
        grunt.file.write(outputFilename, output);
        grunt.log.writeln('File "' + outputFilename + '" created.');

      });
    });
  });
}
