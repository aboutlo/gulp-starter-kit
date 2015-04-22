'use strict';
var Dispatcher = require('../utils/AppDispatcher');
var Actions = require('./actions');

var UserActions;
UserActions = {

  authenticate: function (credentials) {

    Dispatcher.dispatch({
      actionType: Actions.USER_AUTHENTICATE,
      credentials: credentials
    });

  }
};

module.exports = UserActions;
