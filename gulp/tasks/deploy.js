'use strict';
var gulp = require('gulp');
var config  = require('../config').deploy;

gulp.task('deploy', ['images', 'markup', 'jshint', 'browserify', 'minifyCss', 'uglifyJs'],function(){

  gulp.src(config.htmlSrc)
           .pipe(gulp.dest(config.dist));
});
