var $ = require('jquery');
var AppView = require('./views/AppView');

$(function() {
  'use strict';
  new AppView( { el: '#app' });
});
