'use strict';
var Dispatcher = require('flux').Dispatcher;
var _ = require('underscore');

var AppDispatcher = _.extend(new Dispatcher(), {

  handleAction: function(action){
    var payload = {
      source: 'PayloadSources.VIEW_ACTION',
      action: action
    };
    this.dispatch(payload);
  }

});

module.exports = AppDispatcher;
