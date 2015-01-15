'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

var EventBus = require('../utils/EventBus').EventBus();
var config = require('../config');
var User = require('../models/user');
var MainView = require('./MainView');


var App = Backbone.View.extend({

  main: require('../templates/status.tpl'),
  footer: require('../templates/footer.tpl'),

  initialize: function(){
    //this.setElement(options.el);
    console.log('App register to GlobalEvent');

    EventBus.on('GLOBAL:TEST',function(e){
      console.log('APp get global event:' + e);
    });


    this.user = new User();
    this.mainView = new MainView({el: '#main'});
    this.$footer = this.$el.find('#footer');

    this.listenTo(this.user,'change', this.render);
    this.user.set({ userName:'Anonymous User', status:'Connected'});

  },

  render: function(){
    this.mainView.render();
    //this.$main.html(this.main(this.user.attributes));
    this.$footer.html(this.footer(config));
    return this;
  }

});

App.Dispatcher = _.extend({}, Backbone.Events);

module.exports = App;
