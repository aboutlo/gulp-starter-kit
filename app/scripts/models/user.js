'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;

module.exports = Backbone.Model.extend({

  initialize: function(){
    console.log('User init');
  }


});
