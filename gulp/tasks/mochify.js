'use strict';

var gulp = require('gulp');
var mochify = require('mochify');
var config  = require('../config').js;

gulp.task('mochify', function () {
  mochify( config.test, {
    reporter : 'spec',
    cover    : true
    //TODO require  : 'chai' and expose expect
  }).bundle();
});
