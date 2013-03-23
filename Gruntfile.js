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
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        grep: '*-test',
        ui: 'bdd',
        reporter: 'tap'
      },

      all: { src: 'test/*.js' }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-simple-mocha');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);
  grunt.registerTask('test', ['simplemocha']);

};