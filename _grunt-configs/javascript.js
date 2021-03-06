'use strict';

module.exports = function (grunt, sharedConfig) {

    var _srcDir = sharedConfig.srcDir + 'js/';
    var _distDir = sharedConfig.distDir + 'js/';
    var _srcFile = 'app.js';
    var _distFile = 'app.js';
    var _testDir = sharedConfig.testDir;
    var _testSpecDir = _testDir + 'spec/';
    var _testBinDir = _testDir + 'bin/';
    var _testSpecFile = 'test-spec-compiled.js';

    var _paths = {
        srcDir : _srcDir,
        distDir : _distDir,
        distFile : _distFile,
        testSpecDir : _testSpecDir,
        testBinDir : _testBinDir,
        testSpecFile : _testSpecFile
    };

    var _config = {

        browserify : {

            testAll: {
                src : _testSpecDir + '**/*.js',
                dest : _testBinDir + _testSpecFile,
                options : {

                    browserifyOptions : {
                        debug: true,
                        fullPaths: false
                    },

                    plugin: [
                        [
                          'remapify', {
                              cwd: _srcDir, // defaults to process.cwd()
                              src: '**/*.js',
                              expose: ''
                            }
                          
                        ],
                        [
                            'minifyify', {
                                map: _testBinDir + _testSpecFile + '.map',
                                output: _testBinDir + _testSpecFile + '.map'
                            }
                        ]
                    ],

                    banner : 'require("source-map-support").install(); var expect = require("chai").expect;',

                    watch: true // use watchify instead of grunt-contrib-watch (much much faster!).
                }
            },

            dev: {
                src : _srcDir + _srcFile,
                dest : _distDir + _distFile,
                options : {

                    browserifyOptions : {
                        debug: true,
                        fullPaths: false
                    },

                    plugin: [
                        [
                          'remapify', {
                              cwd: _srcDir, // defaults to process.cwd()
                              src: '**/*.js',
                              expose: ''
                            }
                        ]
                    ],

                    watch: true // use watchify instead of grunt-contrib-watch (much much faster!).
                }
            },

            dist: {
                src : _srcDir + _srcFile,
                dest : _distDir + _distFile,
                options : {

                    browserifyOptions : {
                        debug: false,
                        fullPaths: false
                    },

                    plugin: [
                        [
                          'remapify', {
                              cwd: _srcDir, // defaults to process.cwd()
                              src: '**/*.js',
                              expose: ''
                            }
                          
                        ],
                        [
                            'minifyify', {
                                map: false,
                                uglify: {
                                    compress: {
                                        drop_console: true
                                    }
                                }
                            }
                        ]
                    ]
                }
            }
        },

        simplemocha : {
            options: {
                timeout: 3000,
                ignoreLeaks: false,
            },

            testAll: {
                src: [_testBinDir + _testSpecFile]
            }
        }
    };

    var _tasks = {
        compile : {
            test : [
                'browserify:testAll',
            ],
            dev : [
                'browserify:dev'
            ],
            dist : [
                'browserify:dist',
            ]
        },
        test : {
            all : ['simplemocha:testAll']
        }
    };

    grunt.registerTask('js:dev', _tasks.compile.dev.concat(_tasks.compile.test));
    grunt.registerTask('js:dist', _tasks.compile.dist.concat(_tasks.compile.test));
    grunt.registerTask('js:testAll', _tasks.test.all);

    return {
        paths : _paths,
        config : _config,
        tasks : _tasks
    };
};