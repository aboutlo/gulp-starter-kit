'use strict';
var gulp = require('gulp');
var config  = require('../config').deploy;
var fs = require('fs');
var awspublish = require('gulp-awspublish');
var gutil = require('gulp-util');

gulp.task('deploy', ['images', 'markup', 'jshint', 'browserify', 'minifyCss', 'uglifyJs'],function(){

  //copy index.html on dist
  gulp.src(config.htmlSrc)
           .pipe(gulp.dest(config.dist));

 var aws = JSON.parse(fs.readFileSync(process.env.HOME + '/.aws/credentials/spatch-credentials.json'));

  var environment = process.env.NODE_ENV || 'development';
  var bucket = environment + '-app.spatch.co';
  var region = 'eu-west-1';

  // More option here https://github.com/LearnBoost/knox#client-creation-options
  var publisher = awspublish.create({ key: aws.accessKeyId,  secret: aws.secretAccessKey, bucket: bucket, region: region });

  // define custom headers
  var headers = {
    'Cache-Control': 'max-age=315360000, no-transform, public'
    // ...
  };

  var src = [config.dist + '/**/*.*'] ;
  gutil.log('src', src);

  return gulp.src(src)

      // gzip, Set Content-Encoding headers and add .gz extension
      //.pipe(awspublish.gzip({ ext: '.gz' }))
      .pipe(awspublish.gzip())

      // publisher will add Content-Length, Content-Type and headers specified above
      // If not specified it will set x-amz-acl to public-read by default
      .pipe(publisher.publish(headers))

      // create a cache file to speed up consecutive uploads
      .pipe(publisher.cache())
      //console.log('cache');

      // print upload updates to console
      .pipe(awspublish.reporter());

});

