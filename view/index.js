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

Generator.prototype.createViewFiles = function createViewFiles() {
  this.jst_path = this.env.options.appPath + '/scripts/templates/' + this.name + '.ejs';

  this.template('view.ejs', this.jst_path);

  this.writeTemplate('view', path.join(this.env.options.appPath + '/scripts/views', this.name));

  this.addScriptToFooter('views/' + this.name);
};
