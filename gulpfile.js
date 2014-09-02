var gulp       = require('gulp');
var gulpif     = require('gulp-if');
var sass       = require('gulp-ruby-sass');
var streamify  = require('gulp-streamify');
var uglify     = require("gulp-uglify");
var gutil      = require('gulp-util');

var browserify = require('browserify');
var _          = require('lodash');
var moment     = require("moment");
var source     = require('vinyl-source-stream');
var watchify   = require('watchify');
var args       = require('yargs').argv;

var isProduction = args.env === 'production';

var paths = {
  styles_in: 'assets/scss/**/*',
  styles_out: 'public/styles/css',

  adminJS_root: './assets/scripts/app.js',
  script_out: './public/scripts'
};

gulp.task('sass', function () {

  gutil.log(gutil.colors.green('---------BUNDLING CSS: ' + moment().format("M/D/YY - h:mm:ss a") + ' ---------'));
  return gulp.src('assets/scss/**/*')
    .pipe(sass())
    .on('error', function (err) { console.log(err.message); })
    .pipe(gulp.dest(paths.styles_out));
});

gulp.task('watchify', function() {

  var adminBundler = watchify(browserify(paths.adminJS_root, {
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: true
  }));

  function rebundleAdmin() {

    gutil.log(gutil.colors.green('---------BUNDLING ADMIN.JS: ' + moment().format("M/D/YY - h:mm:ss a") + ' ---------'));

    return adminBundler.bundle()
      // log errors if they happen
      .on('error', function(e) {
        gutil.log('Browserify Error', e);
      })
      .pipe(source('admin.js'))
      .pipe(gulpif(isProduction, streamify(uglify()))) // only minify if production
      .pipe(gulp.dest(paths.script_out));
  }

  // Watch for JS changes in the Review Module
  adminBundler.on('update', rebundleAdmin);

});

gulp.task('watch', ['build', 'watchify'], function() {
  gulp.watch(paths.styles_in, ['sass']);
});

gulp.task('buildJS', function() {

  //
  // Bundle the Admin JS files
  //
  browserify(paths.adminJS_root, {
    cache: {},
    packageCache: {},
    fullPaths: true,
    debug: !isProduction
  })
  .bundle()
  .on('error', function(e) { // log errors if they happen
    gutil.log('Browserify Error', e);
  })
  .pipe(source('review.js'))
  .pipe(gulpif(isProduction, streamify(uglify()))) // only minify if production
  .pipe(gulp.dest(paths.script_out));

});

gulp.task('build', ['sass', 'buildJS']);

gulp.task('default', ['watch']);
