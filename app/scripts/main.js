var $ = require('jquery');
var AppView = require('./views/app.js');

$(function() {
  'use strict';
  new AppView( { el: '#content' });
});
