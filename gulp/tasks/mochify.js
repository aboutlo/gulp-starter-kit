'use strict';

var gulp = require('gulp');
var mochify = require('mochify');
var config  = require('../config').js;
var handleErrors = require('../util/handleErrors');
var preprocessify = require('preprocessify');
var gutil = require('gulp-util');
var environments  = require('../config').environments;


var mochifyTask = function (options) {
  options = options || {};

  var envinronment = process.env.NODE_ENV ||'development';
  gutil.log('mochify envinronment:', envinronment)

  mochify( config.test, {
    reporter : 'spec',
    watch: options.watch
    //debug: true
    //cover    : true,
    //consolify : 'test/runner.html'
    //TODO require  : 'chai' and expose expect   https://github.com/gulpjs/gulp/blob/master/docs/recipes/mocha-test-runner-with-gulp.md
  }).transform('jstify', {
    templateOpts: {
      interpolate: /\{\{(.+?)\}\}/g}
  })
    .transform(preprocessify(environments.development))
    .on('error', handleErrors)
    .bundle();//

};
module.exports = mochifyTask;
