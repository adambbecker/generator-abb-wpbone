/*jshint latedef:false */
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var scriptBase = require('../script-base');

module.exports = Generator;

function Generator() {
  scriptBase.apply(this, arguments);
  var dirPath = '../templates';
  this.sourceRoot(path.join(__dirname, dirPath));

  // TODO: Write jasmine test generator and hook up here
}

util.inherits(Generator, scriptBase);

Generator.prototype.createControllerFiles = function createControllerFiles() {
  this.writeTemplate('router', path.join(this.env.options.appPath + '/scripts/routes', this.name));

  this.addScriptToFooter('routes/' + this.name);
};
