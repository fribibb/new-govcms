// NOTES:
// https://markgoodyear.com/2014/01/getting-started-with-gulp/
// http://www.sitepoint.com/introduction-gulp-js/
// http://ilikekillnerds.com/2014/11/10-highly-useful-gulp-js-plugins-for-a-super-ninja-front-end-workflow/

// *************************
// SETUP STEPS:
//
// # brew install node
// # npm install -g gulp gulp-jshint gulp-imagemin gulp-notify gulp-autoprefixer gulp-minify-css gulp-compass gulp-uncss gulp-concat gulp-minify-css gulp-uglify gulp-css-condense gulp-iconfont jshint
// # cd [this dir]
// # npm link gulp gulp-jshint gulp-imagemin gulp-notify gulp-autoprefixer gulp-minify-css gulp-compass gulp-uncss gulp-concat gulp-minify-css gulp-uglify gulp-css-condense gulp-iconfont jshint
//
// Then just run 'gulp' to watch directory for changes :)
// *************************


// include gulp
var gulp = require('gulp');
// include plug-ins
var jshint = require('gulp-jshint');
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var compass = require('gulp-compass');
var uncss = require('gulp-uncss');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var cssc = require('gulp-css-condense');

// TODO add https://github.com/johanbrook/gulp-fontcustom
//          https://docs.npmjs.com/files/package.json
// Using OS X Iconical for now though,
// check the DESIGN folder



// JS minify
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js/'));
});



// minify new images
gulp.task('images', function() {
  return gulp.src('./src/img/**/*')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./img'))
    // .pipe(notify({ message: 'Images task complete' }));
});



// Compile the Sass
gulp.task('compass', function() {
  gulp.src('./src/sass/*.scss')
    .pipe(compass({
      // config_file: './config.rb',
      css: './src/styles',
      sass: './src/sass'
    }))
    .pipe(gulp.dest('./src/styles'));
});



// CSS concat, auto-prefix, optimise and minify
gulp.task('styles', function() {
  gulp.src(['./src/styles/*.css'])
    .pipe(concat('./styles.css'))
    // .pipe(cssc())
    // .pipe(uncss({
    //   html: ['index.html'],
    //   ignore: ['hover','active','focus','click','navbar','top-nav-collapse','header',/\w\.in/,'.fade','.collapse','collapsing',/(#|\.)navbar(\-[a-zA-Z]+)?/,/(#|\.)dropdown(\-[a-zA-Z]+)?/,/(#|\.)(open)/,'.modal','.modal.fade.in','.modal-dialog','.modal-document','.modal-scrollbar-measure','.modal-backdrop.fade','.modal-backdrop.in','.modal.fade.modal-dialog','.modal.in.modal-dialog','.modal-open','.in','.modal-backdrop','.fade','.fade.in','.collapse','.collapse.in','.collapsing','.alert-danger','.open','/open+/']
    // }))
    .pipe(autoprefix('last 2 versions'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('./css/'));
});




// default gulp task
gulp.task('default', ['images', 'scripts', 'compass', 'styles'], function() {

  // watch for img optim changes
  gulp.watch('./src/img/*', function() {
    gulp.start('images');
  });
  gulp.watch('./src/img/clients/*', function() {
    gulp.start('images');
  });

  // watch for JS changes
  gulp.watch('./src/js/*.js', function() {
    gulp.start('scripts');
  });

  // watch for Sass changes
  gulp.watch('./src/sass/*.scss', function() {
    gulp.start('compass');
  });

  // watch for CSS changes
  gulp.watch('./src/styles/*.css', function() {
    gulp.start('styles');
  });

});
