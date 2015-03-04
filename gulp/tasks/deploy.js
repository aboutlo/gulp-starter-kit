'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var config  = require('../config').deploy;
var fs = require('fs');
var gzip = require('gulp-gzip');
var cachedSrc = [config.dist + '/**/*.{png,ico,js,css}'];
var noCachedSrc = [config.dist + '/index.html'];

gulp.task('deploy', ['release'],function(){

  // S3 with JSON
  var credentials = JSON.parse(fs.readFileSync(process.env.HOME + '/.aws/credentials/credentials.json'));
  var s3 = require('gulp-s3-upload')({
    accessKeyId:        credentials.accessKeyId,
    secretAccessKey:    credentials.secretAccessKey,
    region: 'eu-west-1'
  });

  var environment = process.env.NODE_ENV || 'development';
  var bucket = config.environments[environment];
  gutil.log('deploy to:' + bucket);

  gulp.src(cachedSrc)
    .pipe(gzip({ append: false, gzipOptions: { level: 9 } }))   //not append .gz file extension
    .pipe(s3({
      Bucket:bucket, //  Required
      ACL: 'public-read',       //  Needs to be user-defined
      ContentEncoding: 'gzip',
      CacheControl: 'max-age=315360000, no-transform, public'
    }));

  gutil.log('noCachedSrc:' + noCachedSrc);
  gulp.src(noCachedSrc)
    .pipe(gzip({ append: false, gzipOptions: { level: 9 } }))   //not append .gz file extension
    .pipe(s3({
      Bucket: bucket, //  Required
      ACL: 'public-read',       //  Needs to be user-defined
      ContentEncoding: 'gzip',
      CacheControl: 'private' //never cache
    }));
});

