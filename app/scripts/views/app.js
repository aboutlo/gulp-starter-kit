'use strict';

var $ = require('jquery');
//var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var User = require('../models/user');
var config = require('../config');

module.exports = Backbone.View.extend({

  main: require('../templates/status.tpl'),
  footer: require('../templates/footer.tpl'),

  initialize: function(){
    //this.setElement(options.el);
    this.user = new User();
    this.$main = this.$el.find('#main');
    this.$footer = this.$el.find('#footer');

    this.listenTo(this.user,'change', this.render);
    this.user.set({ userName:'Anonymous User', status:'Connected'});

  },

  render: function(){
    this.$main.html(this.main(this.user.attributes));
    this.$footer.html(this.footer(config));
    return this;
  }

});
