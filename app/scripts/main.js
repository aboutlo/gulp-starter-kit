var $ = require('jquery');
var AppView = require('./views/app');

$(function() {
  'use strict';
  new AppView( { el: '#content' });
});
