'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Task for building Sass styles
function buildStyles() {
  return gulp.src('scss/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('css'));
}

// Task for watching Sass files for changes and running buildStyles and addPrefixes tasks
async function watch() {
  const { default: autoprefixer } = await import('gulp-autoprefixer');

  gulp.watch('scss/**/*.scss', gulp.series(buildStyles, addPrefixes(autoprefixer)));
}

// Task for adding prefixes to CSS files
function addPrefixes(autoprefixer) {
  return function () {
    return gulp.src('scss/style.scss')
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(gulp.dest('css'));
  };
}

// Export tasks
module.exports = {
  buildStyles: buildStyles,
  watch: watch
};
