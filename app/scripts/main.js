var $ = require('jquery');
AppView = require('./views/app.js');

$(function() {
  new AppView( { el: '#content' });
});
