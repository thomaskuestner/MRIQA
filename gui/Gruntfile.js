'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            build: [
                'public/css/libs/',
                'public/fonts'
            ]
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'node_modules/bootstrap/dist/css/', src: ['**'], dest: 'public/css/libs/'},
                    {expand: true, cwd: 'node_modules/bootstrap/dist/fonts/', src: ['**'], dest: 'public/fonts/'}
                ],
            },
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', ['clean', 'copy']);
};
