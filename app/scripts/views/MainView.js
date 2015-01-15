'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var EventBus = require('../utils/EventBus').EventBus();
var Dispatcher = require('../utils/AppDispatcher');

var MainView = Backbone.View.extend({

  main: require('../templates/status.tpl'),

  initialize: function(){

    console.log('MainView register to GlobalEvent');


    //Dispatcher.register('GLOBAL:TEST',function(e){
    //   console.log('MainView Dispatcher get', e);
    //});



    //EventBus.on('GLOBAL:TEST',function(e){
    //  console.log('MainView get global event:' + e);
    //});
    //console.log(this.$el);
    //this.$main = this.$el.find('#main');
  },

  render: function(){
    this.$el.html(this.main(this.model.attributes));


    //EventBus.trigger('GLOBAL:TEST', { username:'user', password:'pswd'});


    return this;
  }

});


module.exports = MainView;
