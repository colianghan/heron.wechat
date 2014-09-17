// Generated by LiveScript 1.2.0
(function(){
  var co, consts, redisClient, flash, setting_repository, index, test;
  co = require('co');
  consts = require('../consts');
  redisClient = require('../helpers/redis');
  flash = require('../helpers/flash');
  setting_repository = require('../repositories/setting_repository');
  this.index = index = (function(){
    index.displayName = 'index';
    var prototype = index.prototype, constructor = index;
    index.get = function*(){
      this.body = 'ok';
    };
    function index(){}
    return index;
  }());
  this.test = test = (function(){
    test.displayName = 'test';
    var prototype = test.prototype, constructor = test;
    test.get = function*(){
      var rep;
      rep = new setting_repository();
      this.body = yield function(done){
        return rep.findOne(done);
      };
    };
    function test(){}
    return test;
  }());
}).call(this);
