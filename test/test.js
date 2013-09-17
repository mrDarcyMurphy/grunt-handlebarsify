var assert = require("assert")
var grunt = require("grunt")

describe('basic', function(){
  it('compiles a basic module', function(done){
    var actual = grunt.file.read('tmp/basic/basic.js')
    var expected = grunt.file.read('test/expected/basic.js')
    assert.equal(actual, expected, 'should compile into a module')
    done()
  })
})

describe('partialed', function(){
  it('compiles a module that will register a handlebars partial', function(done){
    var actual = grunt.file.read('tmp/partialed/basic.js')
    var expected = grunt.file.read('test/expected/partialed.js')
    assert.equal(actual, expected, 'should compile into a module')
    done()
  })
})

describe('expanded', function(){
  it('compiles an expanded path', function(done){
    var actual = grunt.file.read('tmp/expanded/basic.js')
    var expected = grunt.file.read('test/expected/expanded.js')
    assert.equal(actual, expected, 'should compile into a module')
    done()
  })
})
