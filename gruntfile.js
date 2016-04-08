module.exports = function (grunt) {
  'use strict';

  var cfg = {
    pkg: grunt.file.readJSON('./package.json'),
    jshint: {
      options: {
        jshintrc: './.jshintrc'
      },
      all: ['lib/**.js', 'examples/**.js', 'spec/**-spec.js']
    },
    jasmine_node: {
      options: {
        forceExit: true,
        match: '.',
        matchall: false,
        extensions: 'js',
        specNameMatcher: 'spec'
      },
      all: ['spec/*spec']
    }
  };

  grunt.initConfig(cfg);

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jasmine-node');

  var all   = ['jshint', 'jasmine_node'],
    linters = ['jshint'],
    testers = ['jasmine_node'];

  grunt.registerTask('lint', linters);
  grunt.registerTask('test', testers);
  grunt.registerTask('all', all);
};
