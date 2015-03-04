'use strict';
var gulp      = require('gulp');
var config    = require('../config').deploy;
var minifyCSS = require('gulp-minify-css');
var size      = require('gulp-filesize');
var rev       = require('gulp-rev');

gulp.task('minifyCss', ['sass'], function() {
  return gulp.src(config.cssSrc)
    .pipe(minifyCSS({keepBreaks:false}))
    .pipe(rev())
    .pipe(gulp.dest(config.dist + '/css')) // copy rev css to dist
    .pipe(size())
    .pipe(rev.manifest({
      base: config.dist,
      merge: true,
      path: config.dist + '/rev-manifest.json'
    }))
    .pipe(gulp.dest(config.dist)); // copy rev-manifest to dist
});
