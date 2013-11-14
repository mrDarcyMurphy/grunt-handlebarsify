grunt-handlebarsify
===================

> Precompile handlebars templates for Node.js and Browserify.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-handlebarsify --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-handlebarsify');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.3](https://github.com/gruntjs/grunt-contrib-handlebars/tree/grunt-0.3-stable).*

## Handlebarsify task

_Run this task with the `grunt handlebarsify` command.

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

### Options

#### wrapped
Type: `Boolean`
Default: `true`

Determine if preprocessed template functions will be wrapped in Handlebars.template function.

#### processName
Type: `function`

This option accepts a function which takes one argument (the template filepath) and returns a string which will be used as the key for the precompiled template object.  The example below stores all templates on the default JST namespace in capital letters.

```js
options: {
  processName: function(filePath) {
    return filePath.toUpperCase();
  }
}
```

#### processPartialName
Type: `function`

This option accepts a function which takes one argument (the partial filepath) and returns a string which will be used as the key for the precompiled partial object when it is registered in Handlebars.partials. The example below stores all partials using only the actual filename instead of the full path.

```js
options: {
  processPartialName: function(filePath) { // input:  templates/_header.hbs
    var pieces = filePath.split("/");
    return pieces[pieces.length - 1]; // output: _header.hbs
  }
}
````

Note: If processPartialName is not provided as an option the default assumes that partials will be stored by stripping trailing underscore characters and filename extensions. For example, the path *templates/_header.hbs* will become *header* and can be referenced in other templates as *{{> header}}*.

#### compilerOptions
Type `Object`
Default: `{}`

This option allows you to specify a hash of options which will be passed directly to the Handlebars compiler.

``` javascript
options: {
  compilerOptions: {
    knownHelpers: {
      "my-helper": true,
      "another-helper": true
    },
    knownHelpersOnly: true
  }
}
```

### Usage Examples

```js
handlebarsify: {
  compile: {
    options: {
      wrapped: false,
      compilerOptions: {
        knownHelpersOnly: false
      }
    },
    files: {
      "path/to/result.js": "path/to/source.hbs",
      "path/to/another.js": ["path/to/sources/*.hbs", "path/to/more/*.hbs"]
    }
  }
}
```
