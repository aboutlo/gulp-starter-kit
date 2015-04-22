'use strict';
var SessionStore  = require('../../app/js/stores/SessionStore');
var expect        = require('chai').expect;

describe('SessionStore', function(){

  describe('defaults',function(){

    it('has username', function(){
      expect(SessionStore.getSession().username).to.equal('');
    });

    it('has password', function(){
      expect(SessionStore.getSession().password).to.equal('');
    });

    it('has status', function(){
      expect(SessionStore.getSession().status).to.equal('offline');
    });

    it('isn\'t authenticated',function(){
      expect(SessionStore.getSession().authenticated).to.be.false();
    });

  });

  describe('#validate',function(){

    describe('false',function(){

      it('with default values',function(){
        expect(SessionStore.validate({})).to.false();
      });

      it('with only username',function(){
        expect(SessionStore.validate({username:'username'})).to.false();
      });

      it('with only password',function(){
        expect(SessionStore.validate({password:'password'})).to.false();
      });

      it('with a username shorter than 6 ',function(){
        expect(SessionStore.validate({username:'12345'})).to.false();
      });

      it('with a password shorter than 5 ',function(){
        expect(SessionStore.validate({password:'1234'})).to.false();
      });

    });

    describe('true',function(){

      it('with a username and a password',function(){
        var credentials = { username:'test@test.com', password:'123456'};
        expect(SessionStore.validate(credentials)).to.true();
      });

    });



  });

  describe('#authenticate',function(){

    it('with username "admin@foo.com" and password "admin" ' ,function(){
      var credentials = { username:'admin@foo.com', password:'admin'};
      SessionStore.login(credentials);
      expect(SessionStore.getSession().authenticated).to.true();
    });

  });



});
