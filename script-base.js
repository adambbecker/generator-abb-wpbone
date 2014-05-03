'use strict';
var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var backboneUtils = require('./util.js');


var Generator = module.exports = function Generator() {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.themeTitle = this.config.get('themeTitle') || path.basename(process.cwd());

  this.env.options.appPath = this.config.get('appPath') || 'app';

  this.setupSourceRootAndSuffix();

  this._.mixin({ 'classify': backboneUtils.classify });
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.addScriptToFooter = function (script) {
  try {
    var appPath = this.env.options.appPath;
    var fullPath = path.join(appPath, 'footer_include.php');

    backboneUtils.rewriteFile({
      file: fullPath,
      needle: '<!-- endbuild -->',
      splicable: [
        '<script src="scripts/' + script + '.js"></script>'
      ]
    });
  } catch (e) {
    console.log('\nUnable to find '.yellow + fullPath + '. Reference to '.yellow + script + '.js ' + 'not added.\n'.yellow);
  }
};

Generator.prototype.setupSourceRootAndSuffix = function setupSourceRootAndSuffix() {
  var sourceRoot = '/templates';
  this.scriptSuffix = '.js';

  this.sourceRoot(path.join(__dirname, sourceRoot));
};

Generator.prototype.writeTemplate = function writeTemplate(source, destination, data) {
  this.setupSourceRootAndSuffix();
  var ext = this.scriptSuffix;
  this.template(source + ext, destination + ext, data);
};
