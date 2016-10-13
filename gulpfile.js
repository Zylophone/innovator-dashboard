var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concatCss = require('gulp-concat-css'),
    cleanCss = require('gulp-clean-css');

gulp.task('manifest', function() {
  return gulp.src('src/manifest.json')
    .pipe(gulp.dest('dist/'));
});

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('css', function() {
  return gulp.src('src/**/*.css')
    .pipe(concatCss('bundle.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/'));
});

gulp.task('js', function() {
  return gulp.src('src/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function() {
  gulp.watch('src/manifest.json', ['manifest']);
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/**/*.css', ['css']);
  gulp.watch('src/**/*.js', ['js']);
});

gulp.task('default', ['manifest', 'html', 'css', 'js', 'watch']);
