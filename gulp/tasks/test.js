var gulp = require('gulp');
var mochifyTask = require('./mochify');

gulp.task('test', ['jshint'],function(){

  mochifyTask({watch:false});
  //DO NOTHING
});
