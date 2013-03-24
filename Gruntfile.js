module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*\n * <%= pkg.name %>.js - <%= pkg.version %> \n' + 
                ' * Author : <%= pkg.author %> \n' +
                ' */\n\n'
      },
      build: {
        src: ['src/<%= pkg.name.toLowerCase() %>.js', 'src/units.js'],
        dest: 'build/<%= pkg.name.toLowerCase() %>.min.js'
      }
    },

    simplemocha: {
      all: { src: 'test/*.js' }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Default task(s).
  grunt.registerTask('minify', ['uglify']);
  grunt.registerTask('test', ['simplemocha']);

};