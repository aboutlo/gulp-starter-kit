'use strict';
var User = require('../../app/js/models/User');
var expect = require('chai').expect;

describe('User', function(){

  beforeEach(function(){
    this.user = new User();
  });

  describe('defaults',function(){

    it('has username', function(){
      expect(this.user.get('username')).to.equal('');
    });

    it('has password', function(){
      expect(this.user.get('password')).to.equal('');
    });

    it('has status', function(){
      expect(this.user.get('status')).to.equal('offline');
    });

    it('isn\'t authenticated',function(){
      expect(this.user.get('authenticated')).to.false();
    });

  });

  describe('#validate',function(){

    describe('invalid',function(){

      it('with default values',function(){
        expect(this.user.isValid()).to.false();
      });

      it('with a username',function(){
        this.user.set({username:'username'});
        expect(this.user.isValid()).to.false();
      });

      it('with a password',function(){
        this.user.set({password:'password'});
        expect(this.user.isValid()).to.false();
      });

      it('with a username shorter than 6 ',function(){
        this.user.set( { username:'12345'} );
        expect(this.user.isValid()).to.false();
      });

      it('with a password shorter than 5 ',function(){
        this.user.set( { password:'1234'} );
        expect(this.user.isValid()).to.false();
      });

    });

    describe('valid',function(){

      it('with a username and a password',function(){
        this.user.set( { username:'123456', password:'123456'} );
        expect(this.user.isValid()).to.true();
      });

    });



  });

  describe('#authenticate',function(){

    it('with username "admin@foo.com" and password "admin" ' ,function(){
      this.user.set( { username:'admin@foo.com', password:'admin'}, {validate:true} );
      this.user.authenticate();
      expect(this.user.get('authenticated')).to.true();
    });

  });



});
