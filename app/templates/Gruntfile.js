'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to match all subfolders:
// 'test/spec/**/*.js'
// templateFramework: 'jst'

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  // configurable paths
  var yeomanConfig = {
    app: '<%= env.options.appPath %>',
    dist: 'dist'
  };

  grunt.initConfig({

    yeoman: yeomanConfig,

    watch: {
      options: {},
      styles: {
        files: ['<%%= yeoman.app %>/styles/{,*/}*.scss'],
        tasks: ['sass', 'autoprefixer']
      },
      jst: {
        files: [
          '<%%= yeoman.app %>/scripts/templates/*.ejs'
        ],
        tasks: ['jst']
      },
      'footer-inc': {
        files: ['<%%= yeoman.app %>/footer_include.php'],
        tasks: ['string-replace:dev']
      }
    },

    sass: {
      main: {
        options: { style: 'expanded' },
        files: { '<%%= yeoman.app %>/styles/main.css':'<%%= yeoman.app %>/styles/main.scss' }
      }
    },

    autoprefixer: {
      main: {
        options: {
          browsers: ['> 1%', 'last 2 versions', 'ie >= 9']
        },
        src: '<%%= yeoman.app %>/styles/main.css',
        dest: '<%%= yeoman.app %>/styles/main.css'
      }
    },

    clean: {
      dist: ['.tmp', '<%%= yeoman.dist %>/*'],
      server: '.tmp'
    },

    uglify: {},

    useminPrepare: {
      html: '<%%= yeoman.app %>/footer_include.php',
      options: {
        dest: '<%%= yeoman.dist %>'
      }
    },

    usemin: {
      html: ['<%%= yeoman.dist %>/footer_include.php'],
      options: {
        dirs: ['<%%= yeoman.dist %>']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg}',
          dest: '<%%= yeoman.dist %>/images'
        }]
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%%= yeoman.dist %>/styles/main.css': [
            '<%%= yeoman.app %>/styles/{,*/}*.css'
          ]
        }
      }
    },

    jst: {
      compile: {
        files: {
          '<%%= yeoman.app %>/scripts/templates.js': ['<%%= yeoman.app %>/scripts/templates/*.ejs']
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%%= yeoman.app %>',
          dest: '<%%= yeoman.dist %>',
          src: [
              '*.{ico,txt}',
              '.htaccess',
              'images/{,*/}*.{webp,gif}',
              'styles/fonts/{,*/}*.*',
              'footer_include.php'
          ]
        }]
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%%= yeoman.dist %>/scripts/{,*/}*.js',
            '<%%= yeoman.dist %>/styles/{,*/}*.css',
            '<%%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}'
          ]
        }
      }
    },

    modernizr: {
      dist: {
        // [REQUIRED] Path to the build you're using for development.
        'devFile' : '<%%= yeoman.app %>/scripts/modernizr-dev.js',

        // [REQUIRED] Path to save out the built file.
        'outputFile' : '<%%= yeoman.app %>/scripts/modernizr.js',

        // Based on default settings on http://modernizr.com/download/
        'extra' : {
          'shiv' : true,
          'printshiv' : false,
          'load' : false,
          'mq' : false,
          'cssclasses' : true
        },

        // Based on default settings on http://modernizr.com/download/
        'extensibility' : {
          'addtest' : false,
          'prefixed' : true,
          'teststyles' : false,
          'testprops' : true,
          'testallprops' : true,
          'hasevents' : true,
          'prefixes' : true,
          'domprefixes' : true
        },

        // By default, source is uglified before saving
        'uglify' : false,

        // Define any tests you want to implicitly include.
        'tests' : [
          'csstransforms',
          'touch'
        ],

        // By default, this task will crawl your project for references to Modernizr tests.
        // Set to false to disable.
        'parseFiles' : false,

        // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
        // You can override this by defining a 'files' array below.
        // 'files' : ['assets/css/screen.css'],

        // When parseFiles = true, matchCommunityTests = true will attempt to
        // match user-contributed tests.
        'matchCommunityTests' : false,

        // Have custom Modernizr tests? Add paths to their location here.
        'customTests' : []
      }
    },

    'string-replace': {
      dev: {
        files: {
          'footer_include.php': '<%%= yeoman.app %>/footer_include.php'
        },
        options: {
          replacements: [{
            pattern: /<script src="(.*?)"><\/script>/g,
            replacement: function (match, p1, offset, string) {
              var dirMap = p1.split('/');
              var preStr = (dirMap[dirMap.length-2] == 'scripts' || dirMap[0] == 'bower_components') ? '' : dirMap[dirMap.length-2] + '_';
              return 'wp_enqueue_script(\'' + preStr + dirMap.pop().split('.')[0] + '\', get_template_directory_uri() . \'/' + yeomanConfig.app + '/' + p1 + '\', array(), \'\', true);';
            }
          },{
            pattern: '<?php ?>',
            replacement: '<?php '
          },{
            pattern: /<!--[\s\S]*?-->/g,
            replacement: ''
          }]
        }
      },
      dist: {
        files: {
          '<%%= yeoman.dist %>/footer_include.php': '<%%= yeoman.dist %>/footer_include.php'
        },
        options: {
          replacements: [{
            pattern: /<script src="(.*?)"><\/script>/g,
            replacement: function (match, p1, offset, string) {
              var fileParts = p1.split('.');
              return 'wp_enqueue_script(\'' + fileParts[1] + '\', get_template_directory_uri() . \'/' + yeomanConfig.dist + '/' + p1 + '\', array(), \'' + fileParts[0].split('/').pop() + '\', true);';
            }
          },{
            pattern: '<?php ?>',
            replacement: '<?php '
          }]
        }
      }
    }

  });

  grunt.registerTask('createDefaultTemplate', function () {
      grunt.file.write(grunt.config.data.yeoman.app + '/scripts/templates.js', 'this.JST = this.JST || {};');
  });

  grunt.registerTask('build', [
    'clean:dist',
    'modernizr',
    'createDefaultTemplate',
    'jst',
    'useminPrepare',
    'sass',
    'autoprefixer',
    'imagemin',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'rev',
    'usemin',
    'string-replace'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);
};
