var gulp       = require('gulp');
var mochify = require('mochify');

gulp.task('mochify', function () {
  mochify('./test/**/*.js', {
    reporter : 'spec',
    cover    : true
    //require : 'chai'
  }).bundle();
});
