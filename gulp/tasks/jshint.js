'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');
var config  = require('../config').js;

gulp.task('jshint', function () {
  gulp.src([config.src,config.test])
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'));
    //.pipe(jshint.reporter('fail'));
});
