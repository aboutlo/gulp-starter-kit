'use strict';
var $ = require('jquery');
var Backbone = require('backbone');
var Dispatcher = require('../utils/AppDispatcher');
var Actions = require('../actions/Actions');
var _ = require('underscore');
Backbone.$ = $;

module.exports = Backbone.Model.extend({

  initialize: function(){
    //console.log('User init');

    Dispatcher.register(_.bind(function(payload){
      switch (payload.actionType){

        case Actions.USER_AUTHENTICATE:
          console.log('User catch:',payload);
          this.set({ username:'Mr Smith',status:'online'});
          break;

        default:
        //DONOTHING
      }

    },this));

  }

});
