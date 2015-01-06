var User = require("../../app/scripts/models/user.js");
var expect = require('chai').expect;

describe("User", function(){

  beforeEach(function(){
    this.user = new User({
      username: "Joe Schmoe",
      status: "online"
    });
  });

  it("should have name", function(){
    expect(this.user.get('username')).to.equal('Joe Schmoe');
  });

  it("should have status", function(){
    expect(this.user.get('status')).to.equal('online');
  });

});
