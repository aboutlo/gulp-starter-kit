'use strict';

var $        = require('jquery');
var _        = require('underscore');
var Backbone = require('backbone');
Backbone.$   = $;

var config       = require('../config');
var LoginView    = require('../views/LoginView');
var MainView     = require('../views/MainView');
var SessionStore = require('../stores/SessionStore');

var AppView = Backbone.View.extend({

  initialize: function(){
    this.listenTo(SessionStore,'change',this.render);
    this.render();
  },

  _switchView: function(view) {
    if (this.currentView) {
      this.currentView.remove();
    }

    this.$el.html(view.el);
    view.render();

    this.currentView = view;
    return this.currentView;
  },

  render: function(){
    if (!SessionStore.getSession().authenticated){
      this._switchView(new LoginView());
    } else {
      this._switchView(new MainView());
    }
    return this;
  }

});

module.exports = AppView;
