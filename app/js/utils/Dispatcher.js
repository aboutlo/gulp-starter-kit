'use strict';
var Backbone = require('backbone');
var _ = require('underscore');

var _vent = null;

var Dispatcher = function(){

  if (!_vent) {
    _vent = _.extend({}, Backbone.Events);
  }

};

Dispatcher.prototype = {

  dispatch:function(action){
    _vent.trigger(action.actionType, _.omit(action,'actionType'));
  },

  register:function(callback){
    _vent.on('all',callback);
  },

  unregister:function(callback){
    _vent.off('all',callback);
  },

  waitFor:function(ids){
    throw new Error('waitFor '+ ids +' has not been implemented!');
  }

};

module.exports = Dispatcher;
