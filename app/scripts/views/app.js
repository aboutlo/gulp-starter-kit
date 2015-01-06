'use strict';

var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;

module.exports = Backbone.View.extend({

  initialize: function(){
    console.log('initialize spatch app');
    this.render();
  },

  render: function(){
    console.log(' spatch app render!');
    this.$el.html('<p>test test</p>');
    return this;
  }

});
