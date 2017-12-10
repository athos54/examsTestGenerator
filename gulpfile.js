var
  livereload = require('gulp-livereload'),
  uglifycss = require('gulp-uglifycss'),
  less = require('gulp-less'),
  path = require('path');
  babel = require('gulp-babel'),
  rename = require("gulp-rename"),
  watch = require('gulp-watch'),
  uglify = require('gulp-uglify'),
  browserify = require('gulp-browserify'),
  gulp = require('gulp');

gulp.task('browserify', function() {
  gulp.src('src/main.js')
  .pipe(browserify())
  .pipe(babel({
      presets: ['env']
  }))
  .pipe(uglify())
  .pipe(rename('bundle.min.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(livereload())
});

gulp.task('less',function(){
  gulp.src('src/less/*.less')
  .pipe(less())
  .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
  .pipe(gulp.dest('dist/css'))
  .pipe(livereload());
});

gulp.task('watch',function(){
  livereload.listen();
  gulp.watch('src/*.js',['browserify']);
  gulp.watch('src/less/*.less',['less']);
});

gulp.task('default',['watch']);
