'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var Dispatcher = require('../utils/AppDispatcher');
var Actions = require('../actions/Actions');
var _ = require('underscore');
Backbone.$ = $;

module.exports = Backbone.Model.extend({

  defaults:{
    username: '',
    password: '',
    status:   'offline',
    authenticated:   false
  },

  initialize: function(){
    //console.log('User init');

    Dispatcher.register(_.bind(function(payload){
      switch (payload.actionType){

        case Actions.USER_AUTHENTICATE:

          this.set(payload.user, { validate:true });

          if (this.isValid()){
             this.authenticate();
          }

          break;

        default:
        //DONOTHING
      }

    },this));

  },

  validate: function(attributes){
    var errors = [];
    if (attributes.username.length < 6 || attributes.password.length < 5 ){
      errors.push('Invalid credentials');
    }
    return errors.length === 0 ? null : errors;
  },

  // fake auth
  authenticate:function(){
    if (this.get('username') === 'admin@foo.com' && this.get('password') === 'admin'){
      this.set({authenticated:true, status:'online'});
    }else{
      this.validationError = 'Wrong username or password';
      this.set({authenticated:false},{silent:true});
      this.trigger('invalid');
    }

  }

});
