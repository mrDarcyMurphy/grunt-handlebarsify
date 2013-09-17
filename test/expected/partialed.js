var glob = ('undefined' === typeof window) ? global : window;
Handlebars = glob.Handlebars || require('handlebars');
var template = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<p>Lorem ipsum.</p>\n";
  })
Handlebars.registerPartial('test.fixtures.basic', template)
module.exports = template
