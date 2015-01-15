'use strict';
var Backbone = require('backbone');
var _ = require('underscore');

var _vent = null;

module.exports = {

  EventBus: function () {
    if (!_vent) {
      _vent = _.extend({}, Backbone.Events);
    }
    return _vent;
  }

};
