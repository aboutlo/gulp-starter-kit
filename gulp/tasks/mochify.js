'use strict';

var gulp = require('gulp');
var mochify = require('mochify');
var config  = require('../config').js;

gulp.task('mochify', ['jshint'], function () {
  mochify( config.test, {
    reporter : 'spec'
    //debug: true,
    //cover    : true,
    //consolify : 'build/runner.html'
    //TODO require  : 'chai' and expose expect   https://github.com/gulpjs/gulp/blob/master/docs/recipes/mocha-test-runner-with-gulp.md
  }).bundle();
});
