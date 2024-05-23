'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

function buildStyles() {
  return gulp.src('scss/style.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('css'));
}

async function watch() {
  const { default: autoprefixer } = await import('gulp-autoprefixer');
  gulp.watch('scss/**/*.scss', gulp.series(buildStyles, addPrefixes(autoprefixer))); // Call addPrefixes function here
}

function addPrefixes(autoprefixer) {
  return () => gulp.src('css/style.css') // Assuming this is the compiled CSS file
    .pipe(autoprefixer())
    .pipe(gulp.dest('css'));
}

module.exports = { buildStyles, watch };