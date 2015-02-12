'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;


var config = require('../config');
var User = require('../models/user');
var LoginView = require('../views/LoginView');
var MainView = require('../views/MainView');


var AppView = Backbone.View.extend({

  initialize: function(){
    this.model = new User();
    this.listenTo(this.model,'change',this.render);
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
    if (!this.model.get('authenticated')){
      this._switchView(new LoginView({model:this.model}));
    } else {
      this._switchView(new MainView({model:this.model}));
    }
    return this;
  }

});

module.exports = AppView;
