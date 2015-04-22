'use strict';

var $           = require('jquery');
var _           = require('underscore');
var Backbone    = require('backbone');
Backbone.$ = $;

var UserActions  = require('../actions/UserActions');
var config       = require('../config');
var SessionStore = require('../stores/SessionStore');

var MainView = Backbone.View.extend({
  template: require('../templates/login.tpl'),
  templateItemError: require('../templates/ItemError.tpl'),
  tagName:'section',
  className:'login',
  id:'loginForm',

  events:{
    'keyup  .login__email, .login__password': 'validateForm',
    'submit form': 'onSubmit'
  },

  initialize: function(){
    this.listenTo(SessionStore,'change',this.render);
    this.debouncedValidate = _.debounce(this.isValid.bind(this), 250);
    this.$el.html(this.template(config));
    this.delegateEvents();
    this.$errors = this.$el.find('.login__errors');
    this.$login  = this.$el.find('.login__button');
  },

  isValid:function(){
    var validated = SessionStore.validate(this.getData());
    validated ?
      this.$login.attr('disabled', false)
      :
      this.$login.attr('disabled', true);
    return validated;
  },

  validateForm: function(e){
    e.preventDefault();
    this.debouncedValidate();
  },

  getData: function(){
    return {
      username: this.$el.find('input[name="username"]').val(),
      password: this.$el.find('input[name="password"]').val()
    };
  },

  onSubmit: function(e){
    e.preventDefault();

    var username = this.$el.find('input[name="username"]').val();
    var password = this.$el.find('input[name="password"]').val();

    var credentials = this.getData();
    if (SessionStore.validate(credentials)) {
      UserActions.authenticate(credentials);
    }

  },

  render: function(){
    this.$errors.empty();

    _.each(SessionStore.getErrors(),function(error){
      this.$errors.append(this.templateItemError({error:error}));
    },this);

    return this;
  }

});

module.exports = MainView;
