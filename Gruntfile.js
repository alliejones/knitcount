
module.exports = function(grunt) {
  var defaultTasks = ['handlebars', 'coffeelint', 'coffee', 'concat'];

  grunt.initConfig({
    bowerful: {
      store: 'vendor',
      dest: 'public/js',
      packages: {
        'jquery': '~1.8',
        'underscore': '',
        'backbone': '',
        'backbone.localStorage': '',
        'handlebars': ''
      }
    },

    coffee: {
      compile: {
        cwd: 'src',
        expand: true,
        src: ['**/*.coffee'],
        dest: 'public/js',
        ext: '.js'
      }
    },

    coffeelint: {
      options: {
        max_line_length: { level: 'ignore' }
      },
      app: ['src/**/*.coffee']
    },

    concat: {
      all: {
        src: [
          'public/js/knitcount.js',
          'public/js/router.js',
          'public/js/models/*.js',
          'public/js/views/*.js',
          'public/js/templates.js'
        ],
        dest: 'public/js/knitcount.all.js',
      }
    },

    handlebars: {
      all: {
        options: {
          namespace: 'KnitCount.Templates',
          processName: function(filePath) {
            var pieces = filePath.split("/");
            return pieces[pieces.length - 1].replace('.hbs', '');
          }
        },
        files: {
          "public/js/templates.js": ["src/templates/*.hbs"]
        }
      }
    },

    watch: {
      all: {
        files: ['src/**/*.coffee', 'src/templates/*.hbs'],
        tasks: defaultTasks,
        options: {
          debounceDelay: 250
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-bowerful');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-coffeelint');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('default', defaultTasks);


  var growl = require('growl');

  ['warn', 'fatal'].forEach(function(level) {
    grunt.util.hooker.hook(grunt.fail, level, function(opt) {
      growl(opt.name, {
        title: opt.message,
        image: 'Console'
      });
    });
  });
};