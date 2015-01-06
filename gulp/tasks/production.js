var gulp = require('gulp');
var config  = require('../config').production;

gulp.task('production', ['images', 'markup', 'jshint', 'browserify', 'minifyCss', 'uglifyJs'],function(){
    return gulp.src(config.htmlSrc)
           .pipe(gulp.dest(config.dist))
});
