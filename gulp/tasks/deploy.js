'use strict';
var gulp = require('gulp');
var config  = require('../config').deploy;
var fs = require('fs');
var gzip = require('gulp-gzip');

// S3 with JSON
var credentials = JSON.parse(fs.readFileSync(process.env.HOME + '/.aws/credentials/spatch-credentials.json'));
var s3 = require('gulp-s3-upload')({
  accessKeyId:        credentials.accessKeyId,
  secretAccessKey:    credentials.secretAccessKey,
  region: 'eu-west-1'
});

/*
// S3 with AIM User (not tested)
var s3 = require('gulp-s3-upload')({
  region: 'eu-west-1'
});
*/

gulp.task('deploy', ['images', 'markup', 'jshint', 'browserify', 'minifyCss', 'uglifyJs'],function(){

  //copy index.html on dist
  gulp.src(config.htmlSrc)
           .pipe(gulp.dest(config.dist));

  var environment = process.env.NODE_ENV || 'development';
  var bucket = environment + '-app.spatch.co';

  var src = [config.dist + '/**/*.*'] ;

  gulp.src(src)
    .pipe(gzip({ append: false }))
    .pipe(s3({
      Bucket: bucket, //  Required
      ACL:    'public-read',       //  Needs to be user-defined
      ContentEncoding: 'gzip',
      CacheControl: 'max-age=315360000, no-transform, public',
      uploadNewFilesOnly: true
    }))
  ;

});

