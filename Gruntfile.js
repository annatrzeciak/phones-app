module.exports = function(grunt) {
require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks
 
grunt.initConfig({
    php: {
        dev: {
            options: {
                hostname: 'localhost',
                base:'api'
            }
        }
    },
    run: {
        commands: {
          exec: 'ng serve -o ',
        }
      }
});
grunt.loadNpmTasks('grunt-run');

grunt.registerTask('start', ['php', 'run:commands']);
};

