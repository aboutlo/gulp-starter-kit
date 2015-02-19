'use strict';
var notify = require('gulp-notify');
var gutil = require('gulp-util');

module.exports = function() {

  var envinronment = process.env.NODE_ENV ||'development';

  if (envinronment === 'development'){

    var args = Array.prototype.slice.call(arguments);
    // Send error to notification center with gulp-notify
    notify.onError({
      title: "Compile Error",
      message: "<%= error %>"
    }).apply(this, args);
  }

  // Keep gulp from hanging on this task
  this.emit('end');
};
