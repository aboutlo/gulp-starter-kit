'use strict';

var $ = require('jquery');
//var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var User = require('../models/user.js');
var template = require('../templates/status.tpl');

module.exports = Backbone.View.extend({

  template: template,

  initialize: function(){
    this.user = new User();
    this.listenTo(this.user,'change', this.render);
    this.user.set({ userName:'Anonymous User', status:'Connected'});
  },

  render: function(){
    this.$el.html(template(this.user.attributes));
    return this;
  }

});
