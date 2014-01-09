module.exports = function(grunt) {

  pkg = require('./package.json');

  // Load the plugins that provide third-party tasks
  for (var name in pkg.devDependencies) {
    if (name.substring(0,6) == 'grunt-') {
      grunt.loadNpmTasks(name);
    }
  }

  // Configuration for rewrite & proxy
  rewriteRulesSnippet = require('grunt-connect-rewrite/lib/utils').rewriteRequest;
  proxySnippet        = require('grunt-connect-proxy/lib/utils').proxyRequest;

  // Project configuration.
  grunt.initConfig({
    pkg: pkg,


    bower: {
      install: {
        options: {
          targetDir: 'dev/libraries',
          layout: 'byType',
          install: true,
          verbose: false,
          cleanTargetDir: true,
          cleanBowerDir: false,
          bowerOptions: {}
        }
      }
    },



    jshint: {
      options: {

      },
      
      all: ['Gruntfile.js', 'dev/js/**/*.js']
    },



    uglify: {
      libraries: {
        files: [{
          expand: true,
          cwd: 'dev/libraries',
          src: [
            '**/*.js',
            '!**/tests/**/*.js',
            '!**/test/**/*.js'
          ],
          dest: 'release/libraries'
        }]
      },
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      }
    },



    less: {
      compile: {
        options: {
          paths: ['css']
        },
        files: {
          'dev/css/main.css': ['src/less/*.less']
        }
      }
    },


    requirejs: {
      js: {
        options: {
          appDir: 'dev/js',
          dir: 'release/js',
          keepBuildDir: true,
          baseUrl: '.',
          mainConfigFile: 'dev/js/config.js'
        }
      }
    },


    connect: {
      options: {
        port: 3333,
        hostname: 'localhost'
      },
      rules: [{
        from: '^((?!css|html|coffee|js|png|gif|img|fonts|\/$).)*$',
        to: '/'
      }],
      proxies: [{
        context: '/api',
        host: 'api.domain.tld',
        port: 443,
        https: true,
        changeOrigin: true,
        xforward: false,
        rewrite: {
          '^/api': ''
        }
      }],
      server: {
        options: {
          base: 'dev',
          middleware: function (connect, options) {
            return [proxySnippet, rewriteRulesSnippet, connect.static(require("path").resolve(options.base))];
          }
        }
      }
    },



    copy: {

      options: {
        excludeEmpty: true
      },

      index: {
        files: [{
          dest: 'dev',
          cwd: 'src',
          expand: true,
          filter: 'isFile',
          src: [
            'index.html'
          ]
        }]
      },

      assets: {
        files: [{
          dest: 'dev/assets',
          cwd: 'src/assets',
          expand: true,
          filter: 'isFile',
          src: [
            '**/*'
          ]
        }]
      },

      js: {
        files: [{
          dest: 'dev/js',
          cwd: 'src/js',
          expand: true,
          filter: 'isFile',
          src: [
            '**/*'
          ]
        }]
      }
    },




    watch: {
      index: {
        files: 'src/index.html',
        tasks: [
          'copy:index'
        ]
      },

      assets: {
        files: 'src/assets/**/*',
        tasks: [
          'copy:assets'
        ]
      },

      js: {
        files: 'src/js/**/*.js',
        tasks: [
          'copy:js',
          'jshint'
        ],
        options: {
          interrupt: true
        }
      },

      less: {
        files: 'src/less/*.less',
        tasks: [
          'less:compile'
        ]
      },
    },



    clean: {
      all: [
        'bower_components',
        'dev',
        'release'
      ]
    }



  });


  // Default task
  grunt.registerTask('default', [
    'dev'
  ]);

  grunt.registerTask('compile', [
    'less:compile',
    'jshint:all'
  ]);

  // Development
  grunt.registerTask('dev', [
    'clean',
    'bower:install',
    'compile',
    'copy:index',
    'copy:assets',
    'copy:js'
  ]);

  // Release
  grunt.registerTask('release', [
    'clean',
    'bower:install',
    'compile',
    'uglify:libraries'
  ]);

  // Server task
  grunt.registerTask('server', [
    'dev',
    'configureRewriteRules',
    'configureProxies',
    'connect:server',
    'watch'
  ]);

};