module.exports = (grunt) ->

  # Project configuration.
  grunt.initConfig

    shell:
      dev:
        command: 'rm -rf _build; rm -rf tmp; mkdir tmp;'


    sass:
      options:
        precision: 3
        sourcemap: true
        noCache: true
      build:
        files:
          'tmp/css/style.css': 'assets/css/style.scss'

    autoprefixer:
      options:
        browsers: ['last 2 version', 'ie 8', '> 1%']
      build:
        expand: true
        flatten: true
        src: 'tmp/css/**/*.css'
        dest: 'tmp/css/'

    cssmin:
      build:
        options:
          report: 'gzip'
        files:
          'tmp/css/style.css': 'tmp/css/style.css'

    coffee:
      options:
        sourceMap: true
      build:
        expand: true
        flatten: true
        cwd: 'assets/js'
        src: '**/*.coffee'
        dest: '_build/assets/js/'
        ext: '.js'

    uglify:
      options:
        report: 'gzip'
      build:
        expand: true
        flatten: true
        cwd: 'tmp/js/'
        src: '**/*.js'
        dest: '_build/assets/js/'

    htmlmin:
      dist:
        options:
          removeComment: true
          collapseWhitespace: true
          removeAttributeQuotes: true
          removeRedundantAttributes: true
          useShortDoctype: true
          removeEmptyAttributes: true
          removeOptionalTags: true
        expand: true
        cwd:'_build'
        src: '**/*.html'
        dest: ''

    imagemin:
      options:
        pngquant: true
      dist:
        expand: true
        cwd: 'assets/img/'
        src: '**/*.{png,jpg,gif}'
        dest: 'tmp/img/'

    connect:
      dev:
        options:
          port: 4000
          base: '_build'
          livereload: true

    copy:
      svg:
        expand: true
        cwd: 'assets/img/'
        src: '**/*.svg'
        dest: 'tmp/img/'
      images:
        expand: true
        cwd: 'assets/img/'
        src: ['**/*.png', '**/*.svg', '**/*.jpg', '**/*.gif']
        dest: 'tmp/img/'
      images_dev:
        expand: true
        cwd: 'tmp/img/'
        src: '**/*.*'
        dest: '_build/assets/img/'
      css:
        expand: true
        flatten: true
        cwd: 'assets/css/'
        src: ['**/*.css']
        dest: 'tmp/css/'
      css_dev:
        expand: true
        flatten: true
        cwd: 'tmp/css/'
        src: ['**/*.css', '**/*.map']
        dest: '_build/assets/css/'
      js:
        expand: true
        cwd: 'assets/js/'
        src: '**/*.js'
        dest: 'tmp/js/'
      js_dev:
        expand: true
        cwd: 'tmp/js/'
        src: ['**/*.js', '**/*.js.map']
        dest: '_build/assets/js/'
      html:
        expand: true
        src: ['**/*.html', '!node_modules/**/*.html']
        dest: '_build/'

    watch:
      coffee:
        files: ['assets/js/**/*.coffee', 'assets/js/**/*.js', '!_build', '!node_modules']
        tasks: 'js:dev'
      html:
        files: ['**/*.html', '!_build/**/*.html']
        tasks: 'default'
      images:
        files: ['assets/img/**/*.png', 'assets/img/**/*.jpg', 'assets/img/**/*.svg']
        tasks: 'media:dev'
      sass:
        files: ['assets/css/**/*.scss', '!_build', '!node_modules']
        tasks: 'css:dev'
      livereload:
        options:
          livereload: true
        files: ['_build/**/*']

  # These plugins provide necessary tasks.
  grunt.loadNpmTasks 'grunt-autoprefixer'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-compress'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-cssmin'
  grunt.loadNpmTasks 'grunt-contrib-htmlmin'
  grunt.loadNpmTasks 'grunt-contrib-imagemin'
  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-uglify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-shell'

  # Default task.
  grunt.registerTask 'default', ['shell:dev', 'copy:html', 'css:dev', 'js:dev', 'media:dev', 'connect', 'watch']

  grunt.registerTask 'css:dev',    ['sass', 'autoprefixer', 'copy:css', 'copy:css_dev']
  grunt.registerTask 'js:dev',     ['coffee', 'copy:js', 'copy:js_dev']
  grunt.registerTask 'media:dev',  ['copy:images', 'copy:images_dev']
