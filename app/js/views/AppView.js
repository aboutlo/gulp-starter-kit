'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;

//var EventBus = require('../utils/EventBus').EventBus();
var UserActions = require('../actions/UserActions');
var config = require('../config');
var User = require('../models/user');
var MainView = require('./MainView');


var AppView = Backbone.View.extend({

  main: require('../templates/status.tpl'),
  footer: require('../templates/footer.tpl'),

  initialize: function(){
    //this.setElement(options.el);
    console.log('AppView register to GlobalEvent');

    //EventBus.on('GLOBAL:TEST',function(e){
    //  console.log('APp get global event:' + e);
    //});


    this.user = new User({username:'Anonymoys',status:'offline'});
    this.mainView = new MainView({el: '#main', model:this.user});
    this.$footer = this.$el.find('#footer');

    this.listenTo(this.user,'change', this.render);

    UserActions.authenticate('smith','1234');

    //this.user.set({ userName:'Anonymous', status:'offline'});

  },

  render: function(){
    this.mainView.render();
    //this.$main.html(this.main(this.user.attributes));
    this.$footer.html(this.footer(config));
    return this;
  }

});

AppView.Dispatcher = _.extend({}, Backbone.Events);

module.exports = AppView;
