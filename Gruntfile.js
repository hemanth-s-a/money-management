module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: "./client",
                    src: ["**/*.html", "**/*.css"],
                    dest: "./dist/client"
                }]
            }
        },
        babel: {
            options: {
                presets: ["es2015", "react"]
            },
            js: {
                files: [{
                    expand: true,
                    cwd: "./client",
                    src: ["**/*.js"],
                    dest: "./dist/client",
                    ext: ".js"
                }, {
                    expand: true,
                    cwd: "./server",
                    src: ["**/*.js"],
                    dest: "./dist/server",
                    ext: ".js"
                }, {
                    expand: true,
                    cwd: "./client",
                    src: ["**/*.jsx"],
                    dest: "./dist/client",
                    ext: ".jsx"
                }]
            }
        },
        watch: {
            copy: {
                files: ["client/**/*.html"],
                tasks: ["copy"]
            },
            babel: {
                files: [
                    "client/**/*.js",
                    "client/**/*.jsx",
                    "server/**/*.js"
                ],
                tasks: ["babel"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", [
        "copy", "babel", "watch"
    ]);
};