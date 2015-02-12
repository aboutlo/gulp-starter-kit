'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var MainView = Backbone.View.extend({

  template: require('../templates/main.tpl'),

  tagName:'section',
  className:'main',

  events:{
    'click #login_button': 'login'
  },

  initialize: function(){
    this.listenTo(this.model,'change',this.render);
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this;
  }

});


module.exports = MainView;
