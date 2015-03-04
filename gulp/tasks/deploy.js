'use strict';
var gulp = require('gulp');
var gutil = require('gulp-util');
var config  = require('../config').deploy;
var environments  = require('../config').environments;
var fs = require('fs');
var gzip = require('gulp-gzip');
var cachedSrc = [config.dist + '/**/*.{png,ico,js,css}'];
var noCachedSrc = [config.dist + '/index.html'];

gulp.task('deploy', ['release'],function(){

  // S3 with JSON

  var s3 = require('gulp-s3-upload')({
    accessKeyId:        config.credentials.accessKeyId,
    secretAccessKey:    config.credentials.secretAccessKey,
    region:             config.region
  });

  var environment = process.env.NODE_ENV || 'development';
  var bucket = environments[environment].bucket;

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

