var gulp = require('gulp'),
    gutil = require('gulp-util'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps');

var paths = {
  manifest: 'manifest.json',
  imgs: 'imgs/*',
  html: ['index.html', 'options.html', 'frame.html'],
  vendorJS: [
    'node_modules/angular/angular.min.js',
    'node_modules/angular-sanitize/angular-sanitize.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-resource/angular-resource.min.js'
  ],
  appJS: [
    'js/app.js',
    'js/controllers/todoCtrl.js',
    'js/services/todoStorage.js',
    'js/directives/todoFocus.js',
    'js/directives/todoEscape.js'
  ],
  optsJS: [
    'js/options.js',
    'js/frame.js'
  ],
  css: 'css/index.css'
};

gulp.task('manifest', function() {
  return gulp.src(paths.manifest)
    .pipe(gulp.dest('dist/'));
});

gulp.task('html', function() {
  return gulp.src(paths.html)
    .pipe(gulp.dest('dist/'));
});

gulp.task('js-vendor', function() {
  return gulp.src(paths.vendorJS)
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('js-app', function() {
  return gulp.src(paths.appJS)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(uglify().on('error', gutil.log))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('js-opts', function() {
  return gulp.src(paths.optsJS)
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function() {
  return gulp.src(paths.css)
    .pipe(gulp.dest('dist/css'));
});

gulp.task('images', function() {
  return gulp.src(paths.imgs)
    .pipe(imagemin())
    .pipe(gulp.dest('dist/imgs'));
});

gulp.task('default', ['manifest', 'images', 'js-vendor', 'js-app', 'js-opts', 'css', 'html']);
