var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    concatCss = require('gulp-concat-css'),
    cleanCss = require('gulp-clean-css'),
    gutil = require('gulp-util');

gulp.task('manifest', function() {
  return gulp.src('src/manifest.json')
    .pipe(gulp.dest('dist/'));
});

gulp.task('images', function() {
  return gulp.src('src/imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/imgs/'));
});

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('sass', function() {
  return gulp.src('src/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src'));
});

gulp.task('css', ['sass'], function() {
  return gulp.src('src/**/*.css')
    .pipe(concatCss('styleBundle.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
  return gulp.src([
      'src/dashboard.js',
      'src/js/helpers.js',
      'src/js/store.js',
      'src/js/model.js',
      'src/js/template.js',
      'src/js/view.js',
      'src/js/controller.js',
      'src/js/app.js'
    ])
    .pipe(concat('appBundle.js'))
    .pipe(uglify().on('error', gutil.log))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
  gulp.watch('src/manifest.json', ['manifest']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/css/*', ['css']);
  gulp.watch('src/**/*.js', ['js']);
});

gulp.task('default', ['manifest', 'images', 'html', 'css', 'js', 'watch']);
