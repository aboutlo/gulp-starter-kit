'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var UserActions = require('../actions/UserActions');
var config = require('../config');

var MainView = Backbone.View.extend({

  template: require('../templates/login.tpl'),
  templateItemError: require('../templates/ItemError.tpl'),

  tagName:'section',
  className:'login',
  id:'loginForm',

  events:{
    'submit form': 'onSubmit'
  },

  initialize: function(){
    this.listenTo(this.model,'change',this.render);
    this.listenTo(this.model,'invalid',this.render);
    this.$el.html(this.template(config));
    this.delegateEvents();
    this.$errors = this.$el.find('.login__errors');
  },

  onSubmit: function(e){
    e.preventDefault();
    var username = this.$el.find('input[name="username"]').val();
    var password = this.$el.find('input[name="password"]').val();

    UserActions.authenticate(username, password);
  },

  render: function(){
    this.$errors.empty();

    _.each(this.model.validationError,function(error){
      this.$errors.append(this.templateItemError({error:error}));
    },this);

    return this;
  }

});


module.exports = MainView;
