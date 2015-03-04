'use strict';
var gulp      = require('gulp');
var gutil = require('gulp-util');
var config  = require('../config').deploy;
var fs = require('fs');
var rev       = require('gulp-rev');
var replace   = require('gulp-replace');

//var cachedSrc = [config.dist + '/**/*.{png,ico,js,css}'];
var noCachedSrc = [config.dist + '/index.html'];

var revReplace = function(manifestPath, streamPath, dest){
  var manifest = JSON.parse(fs.readFileSync(manifestPath));
  var stream = gulp.src(streamPath);
  // replace manifest entry with assets mapped (Ex. Main.js -> Main0294143.js)
  return Object.keys(manifest).reduce(function(stream, key){
    //gutil.log(key + ':' + manifest[key]);
    return stream.pipe(replace(key, manifest[key]));
  }, stream).pipe(gulp.dest(dest));

};

gulp.task('release', ['revHTML', 'jshint'],function(){

});

gulp.task('revHTML', ['revCSS','revJS'], function(){
  return revReplace(config.dist+'/rev-manifest.json',noCachedSrc,config.dist);
});

gulp.task('revJS', ['uglifyJs','revImage'], function(){
  return revReplace(config.dist+'/rev-manifest.json',config.dist + '/js/*.js',config.dist+'/js');
});

gulp.task('revCSS', ['minifyCss','revImage'], function(){
  return revReplace(config.dist+'/rev-manifest.json',config.dist + '/css/*.css',config.dist + '/css');
});

gulp.task('revImage',['images', 'deployMarkup'],function(){
  return gulp.src(config.imgSrc)
    .pipe(rev())
    .pipe(gulp.dest(config.dist + '/images'))
    .pipe(rev.manifest({
      base: config.dist,
      merge: true,
      path: config.dist + '/rev-manifest.json'}))
    .pipe(gulp.dest(config.dist)); // write manifest to build dir
});

gulp.task('deployMarkup',['markup'],function(){
  return gulp.src(config.htmlSrc)
    .pipe(gulp.dest(config.dist));
});
