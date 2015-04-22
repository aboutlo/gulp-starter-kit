'use strict';

var $         = require('jquery');
var _         = require('underscore');
var Backbone  = require('backbone');
Backbone.$    = $;

var SessionStore = require('../stores/SessionStore');

var MainView = Backbone.View.extend({

  template: require('../templates/main.tpl'),

  tagName:'section',
  className:'main',

  events:{
    'click #login_button': 'login'
  },

  initialize: function(){
    this.listenTo(SessionStore,'change',this.render);
  },

  render: function(){
    this.$el.html(this.template(SessionStore.getSession()));
    return this;
  }

});


module.exports = MainView;
