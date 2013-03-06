
module.exports = function(grunt) {
  grunt.initConfig({
    bowerful: {
      store: 'vendor',
      dest: 'public/js',
      packages: {
        'jquery': '~1.8',
        'underscore': '',
        'backbone': ''
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
      app: ['src/**/*.coffee']
    },

    concat: {
      all: {
        src: [
          'public/js/knitcount.js',
          'public/js/router.js',
          'public/js/models/*.js'
        ],
        dest: 'public/js/knitcount.all.js',
      }
    },

    watch: {
      coffee: {
        files: '**/*.coffee',
        tasks: ['coffeelint', 'coffee', 'concat'],
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

  grunt.registerTask('default', ['coffeelint', 'coffee', 'concat']);


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