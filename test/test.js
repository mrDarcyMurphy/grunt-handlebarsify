var assert = require("assert")
var grunt = require("grunt")

describe('basic', function(){
  it('compiles a basic module', function(done){
    var actual = grunt.file.read('tmp/basic/test/fixtures/basic.js')
    var expected = grunt.file.read('test/expected/basic.js')
    assert.equal(actual, expected, 'should compile into a module')

    done()
  })
})

describe('partialed', function(){
  it('compiles a module that will register a handlebars partial', function(done){
    var actual = grunt.file.read('tmp/partialed/test/fixtures/basic.js')
    var expected = grunt.file.read('test/expected/partialed.js')
    assert.equal(actual, expected, 'should compile into a module')

    done()
  })
})
