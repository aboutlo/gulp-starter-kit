'use strict';
var Dispatcher = require('../utils/AppDispatcher');
var Actions = require('./actions');

var UserActions;
UserActions = {

  authenticate: function (username,password) {

    Dispatcher.dispatch({
      actionType: Actions.USER_AUTHENTICATE,
      user: {
        username: username,
        password: password
      }
    });

  }
};

module.exports = UserActions;
