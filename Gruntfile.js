module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            test: {
                options: {
                    port : 8181,
                    base: '.',
                    debug: true
                }
            }
        },
        jasmine: {
            test: {
                options: {
                    host : 'http://127.0.0.1:8181', //must match connect.js config
                    outfile: 'SpecRunner.html',
                    keepRunner: true, // We keep the outfile in place so we can browse to it.
                    specs: './test/*Spec.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfigFile: 'test/config.js'
                    }
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('test', ['connect', 'jasmine']);
    grunt.registerTask('default', ['test']);
};
