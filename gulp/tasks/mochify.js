'use strict';

var gulp = require('gulp');
var mochify = require('mochify');
var config  = require('../config').js;


gulp.task('mochify', ['jshint'], function (watch) {

  var envinronment = process.env.NODE_ENV ||'development';

  mochify( config.test, {
    reporter : 'spec',
    watch: envinronment === 'development'
    //debug: true,
    //cover    : true,
    //consolify : 'test/runner.html'
    //TODO require  : 'chai' and expose expect   https://github.com/gulpjs/gulp/blob/master/docs/recipes/mocha-test-runner-with-gulp.md
  }).bundle();

});
