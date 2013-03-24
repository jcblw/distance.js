module.exports = function(grunt) {

  // Project configuration.
  var banner =  '/*\n * <%= pkg.name %>.js - <%= pkg.version %> \n' + 
                ' * Author : <%= pkg.author %> \n' +
                ' */\n\n'

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: banner
      },
      build: {
        src: ['src/<%= pkg.name.toLowerCase() %>.js', 'src/units.js'],
        dest: 'build/<%= pkg.name.toLowerCase() %>.min.js'
      }
    },

    concat: {
      options: {
        banner: banner,
        separator: '\n\n',
        stripBanners : true
      },
      dist: {
        src: ['src/<%= pkg.name.toLowerCase() %>.js', 'src/units.js'],
        dest: 'build/<%= pkg.name.toLowerCase() %>.js'
      }
    },

    simplemocha: {
      all: { src: 'test/*.js' }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Default task(s).
  grunt.registerTask('minify', ['uglify']);
  grunt.registerTask('test', ['simplemocha']);
  grunt.registerTask('build', ['concat']);

};