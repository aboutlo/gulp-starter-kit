'use strict';
var gulp    = require('gulp');
var config  = require('../config').deploy;
var size    = require('gulp-filesize');
var uglify  = require('gulp-uglify');
var rev     = require('gulp-rev');

gulp.task('uglifyJs', ['browserify'], function() {
  return gulp.src(config.jsSrc)
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest(config.dist + '/js'))
    .pipe(size())
    .pipe(rev.manifest({
      base: config.dist,
      merge: true,
      path: config.dist + '/rev-manifest.json'
    }))
    .pipe(gulp.dest(config.dist));

});
