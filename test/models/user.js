'use strict';
var User = require('../../app/scripts/models/user');
var expect = require('chai').expect;

describe('User', function(){

  beforeEach(function(){
    this.user = new User({
      username: 'Joe Schmoe',
      status: 'online'
    });
  });

  it('has name', function(){
    expect(this.user.get('username')).to.equal('Joe Schmoe');
  });

  it('has status', function(){
    expect(this.user.get('status')).to.equal('offline');
  });

});
