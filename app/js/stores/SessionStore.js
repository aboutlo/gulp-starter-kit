'use strict';
var AppDispatcher = require('../utils/AppDispatcher');
var Actions       = require('../actions/Actions');
var _             = require('underscore');
var Backbone      = require('backbone');

var validEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var _session = {
  username:      '',
  password:      '',
  status:        'offline',
  authenticated: false
};

var _errors = [];

// FIXME migrate to event-emitter
var SessionStore = _.extend({}, Backbone.Events, {

  validate:function (attributes) {
    return !_.isUndefined(attributes.username) &&
           !_.isUndefined(attributes.password) &&
           attributes.username.match(validEmail) !== null &&
           attributes.password.length > 4;
  },

  getSession:function(){
    return _session;
  },

  getErrors:function() {
    return _errors;
  },

  login:function(credentials){
    _session.username = credentials.username;
    _session.password = credentials.password;
    _errors = [];

    if (_session.username === 'admin@foo.com' && _session.password === 'admin'){
      _session.authenticated = true;
      _session.status = 'online';
    }else{
      _session.authenticated = false;
      _errors.push('Wrong username or password');
    }
    this.trigger('change');
  }

});

SessionStore.dispatchToken = AppDispatcher.register(function (action){

  switch (action.actionType) {
    case Actions.USER_AUTHENTICATE:
      SessionStore.login(action.credentials);
      break;

    default:
    //DO NOTHING
  }

});

module.exports = SessionStore;
