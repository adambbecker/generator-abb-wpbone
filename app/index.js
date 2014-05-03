'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var scriptBase = require('../script-base');

var Generator = module.exports = function Generator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.pkg = require('../package.json');

  this.env.options.appPath = this.options.appPath || 'app';
  this.config.set('appPath', this.env.options.appPath);

  this.footerIncFile = this.readFileAsString(path.join(this.sourceRoot(), 'footer_include.php'));

  this.on('end', function () {
    if (!this.options['skip-install']) {
      this.installDependencies();
    }
  });
};

util.inherits(Generator, scriptBase);

Generator.prototype.askFor = function askFor() {
  var done = this.async();

  // have Yeoman greet the user
  this.log(this.yeoman);

  // replace it with a short and sweet description of your generator
  this.log(chalk.magenta('You\'re using a WordPress theme generator specifically designed for Backbone based themes by @adambbecker.'));

  var prompts = [
    {
      name: 'themeTitle',
      message: 'What is the theme title?'
    },
    {
      name: 'authorName',
      message: 'What is the theme author\'s name?',
      default: 'Creative Precision'
    },
    {
      name: 'authorUrl',
      message: 'What is the theme Author\'s url?',
      default: 'http://creativeprecision.co'
    },
    {
      name: 'fnPrefix',
      message: 'What prefix should be used for custom function(s)? e.g. **_function',
      default: 'cp'
    },
    {
      name: 'textDomain',
      message: 'What text domain should be used for translation, e.g. _e("Example String", **)',
      default: 'cp'
    }
  ];

  this.prompt(prompts, function (props) {
    this.themeTitle = props.themeTitle;
    this.authorName = props.authorName;
    this.authorUrl = props.authorUrl;
    this.fnPrefix = props.fnPrefix;
    this.textDomain = props.textDomain;

    done();
  }.bind(this));
};

Generator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};

Generator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

Generator.prototype.bower = function bower() {
  this.template('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
};

Generator.prototype.gruntfile = function gruntfile() {
  this.template('Gruntfile.js');
};

Generator.prototype.packageJSON = function packageJSON() {
  this.template('_package.json', 'package.json');
};

Generator.prototype.readmeFile = function readmeFile() {
  this.template('_readme.md', 'readme.md');
};

Generator.prototype.writeFooterInc = function writeFooterInc() {
  this.template('footer_include.php', this.env.options.appPath + '/footer_include.php');
};

Generator.prototype.setupAppEnv = function setupAppEnv() {
  this.mkdir(this.env.options.appPath);
  this.mkdir(this.env.options.appPath + '/scripts');
  this.mkdir(this.env.options.appPath + '/styles');
  this.mkdir(this.env.options.appPath + '/images');
};

Generator.prototype.setupThemeEnv = function setupThemeEnv() {
  // create base files
  this.copy('theme_files/header.php', 'header.php');
  this.template('theme_files/footer.php', 'footer.php');
  this.template('theme_files/functions.php', 'functions.php');
  this.template('theme_files/index.php', 'index.php');

  // add theme extras
  this.mkdir('includes');
  this.template('theme_files/assets/includes/custom-posttypes.php', 'includes/custom-posttypes.php');
  this.template('theme_files/assets/includes/shortcodes.php', 'includes/shortcodes.php');
  this.template('theme_files/assets/includes/theme-customizer.php', 'includes/theme-customizer.php');
  this.template('theme_files/assets/includes/widgets/widget-custom.php', 'includes/widgets/widget-custom.php');
  this.template('theme_files/assets/js/theme-customizer.js', 'includes/theme-customizer.js');

  // create helpful text items
  this.template('theme_files/changelog.txt', 'changelog.txt');
  this.copy('theme_files/lang_readme.txt', 'languages/readme.txt');
};

Generator.prototype.createDirLayout = function createDirLayout() {
  this.dirs = 'models collections views routes helpers templates'.split(' ');

  this.dirs.forEach(function (dir) {
    this.log.create(this.env.options.appPath + '/scripts/' + dir);
    this.mkdir(path.join(this.env.options.appPath + '/scripts', dir));
  }.bind(this));
};

Generator.prototype.createAssets = function createAssets() {
  this.copy('theme_files/assets/css/custom.css', this.env.options.appPath + '/styles/custom.css');
  this.copy('theme_files/assets/scss/reset.scss', this.env.options.appPath + '/styles/reset.scss');
  this.copy('theme_files/assets/scss/vars.scss', this.env.options.appPath + '/styles/vars.scss');
  this.copy('theme_files/assets/scss/mixins.scss', this.env.options.appPath + '/styles/mixins.scss');
  this.copy('theme_files/assets/scss/base.scss', this.env.options.appPath + '/styles/base.scss');
  this.copy('theme_files/assets/scss/main.scss', this.env.options.appPath + '/styles/main.scss');
  this.template('theme_files/assets/css/style.css', 'style.css');
};

Generator.prototype.createAppFile = function createAppFile() {
  this.writeTemplate('app', this.env.options.appPath + '/scripts/app');
};
