// Generated by LiveScript 1.2.0
(function(){
  var index, test;
  this.index = index = (function(){
    index.displayName = 'index';
    var prototype = index.prototype, constructor = index;
    index.get = function*(){
      this.body = 'ok';
    };
    function index(){}
    return index;
  }());
  test = (function(){
    test.displayName = 'test';
    var prototype = test.prototype, constructor = test;
    test.get = function*(){
      this.body = 'this is test page';
    };
    function test(){}
    return test;
  }());
  module.exports = this;
}).call(this);
