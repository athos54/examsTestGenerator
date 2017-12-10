const livereload = require('gulp-livereload');
const uglifycss = require('gulp-uglifycss');
const less = require('gulp-less');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
// const watch = require('gulp-watch');
const uglify = require('gulp-uglify');
const browserify = require('gulp-browserify');
const gulp = require('gulp');

gulp.task('browserifySrc', () => {
  gulp.src('src/main.js')
    .pipe(browserify())
    .pipe(babel({
      presets: ['env'],
    }))
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

gulp.task('browserifyTest', () => {
  gulp.src('test/test.js')
    .pipe(browserify())
    .pipe(babel({
      presets: ['env'],
    }))
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('test'))
    .pipe(livereload());
});

gulp.task('less', () => {
  gulp.src('src/less/*.less')
    .pipe(less())
    .pipe(uglifycss({
      maxLineLen: 80,
      uglyComments: true,
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

gulp.task('watch', () => {
  livereload.listen();
  gulp.watch('src/*.js', ['browserifySrc']);
  gulp.watch('test/*.js', ['browserifyTest']);
  gulp.watch('test/*.html', ['browserifyTest']);
  gulp.watch('src/less/*.less', ['less']);
});

gulp.task('default', ['watch']);
