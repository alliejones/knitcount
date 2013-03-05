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

    concat: {
      all: {
        src: [
          'public/js/assets.js',
          'public/js/knitcount.js',
          'public/js/router.js',
          'public/js/**/*.js'
        ],
        dest: 'public/js/knitcount.all.js',
      }
    }
  });

  grunt.loadNpmTasks('grunt-bowerful');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', ['coffee', 'concat']);
};