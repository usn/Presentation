module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-uncss');
  grunt.loadNpmTasks('grunt-processhtml');
  grunt.loadNpmTasks('grunt-jsonmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
 
  grunt.initConfig({
 // Before generating any new files, remove any previously-created files. 
   clean: {
    tests: ['tmp', 'dist'] 
   },//clean

   jshint: {
    all: ['Gruntfile.js', 'src/app/js/*.js'] 
    },//jshint 

   imagemin: {
    dynamic: {
     files: [{
      expand: true, 
      cwd: 'src/app/img/', 
      src: ['**/*.{png,jpg,gif}'], 
      dest: 'dist/img/'
     }] 
    }
   },//imagemin 

   concat: {
    options: {
     separator: ';'
    }, 
    dist: {
     src: ['src/app/js/script.js', 'src/app/js/formMain.js'], 
     dest: 'src/app/js/production.js', 
    }, 
   }, //concat

  uglify: {
   my_target: {
    files: {
     'dist/js/production.min.js': ['src/app/js/production.js'] 
     } 
    } 
   }, //uglifyy

  uncss: {
   dist: {
    src: ['src/app/index.html'], 
    dest: 'dist/css/compiled.css'
    }, 
    options: {
     ignore: ['.marquee_nav a', '.marquee_nav a.selected'] 
    } 
   },//uncss

  processhtml: {
   dist: {
    files: {
     'dist/index.html': ['src/app/index.html'] 
    }
   }
  },//processhtml 

  copy: {
   dist: {
    files: [{
     expand: true, 
     cwd: 'src/app/', 
     src: ['img/**', 'js/!*.js','*.png', '*.xml', '*.txt', '*.ico', '!*.html'], 
     dest: 'dist/'
    }]
    }
   },//copy

  jsonmin: {
   dev: {
    files: {
     'dist/js/carousel_data.json': ['src/app/js/carousel_data.json'] 
    }
   }
  },//jsonmin 

  cssmin: {
   dist: {
    options: {
     compatibility: 'ie8', 
     keepSpecialComments: 0, 
     report: 'min'
    },
    files: {
     'dist/css/compiled.min.css': '<%= uncss.dist.dest %>'
    } 
   }
  },//cssmin 

  watch: {
   options: { livereload: true },
   scripts: {
    files: ['src/app/js/*.js','src/app/index.html','src/app/css/*.css', 'src/app/*.json'], 
    tasks: ['clean', 'copy',  'uncss:dist', 'concat', 'uglify', 'imagemin', 'processhtml', 'jsonmin', 'cssmin']
   } 
  } //watch

 }) //initConfig

  // By default, lint and run all tests.
  grunt.registerTask('default', [ 'clean','copy', 'uncss:dist', 'concat', 'uglify', 'imagemin', 'processhtml', 'jsonmin', 'cssmin']);
} //exports