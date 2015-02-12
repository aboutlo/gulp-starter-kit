'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var UserActions = require('../actions/UserActions');

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
    this.$el.html(this.template());
    this.delegateEvents();
  },

  onSubmit: function(e){
    e.preventDefault();
    var username = this.$el.find('#username_field').val();
    var password = this.$el.find('#password_field').val();

    UserActions.authenticate(username, password);
  },

  render: function(){
    this.$el.find('#errors').empty();

    _.each(this.model.validationError,function(error){
      this.$el.find('#errors').append(this.templateItemError({error:error}));
    },this);

    return this;
  }

});


module.exports = MainView;
