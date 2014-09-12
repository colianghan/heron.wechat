// Generated by LiveScript 1.2.0
(function(){
  var consts, helperWechat, logger, wechat;
  consts = require('../consts');
  helperWechat = require('../helpers/wechat')(consts.WECHAT_TOKEN);
  logger = require('../helpers/logger').getLogger('controller');
  this.wechat = wechat = (function(){
    wechat.displayName = 'wechat';
    var prototype = wechat.prototype, constructor = wechat;
    wechat.get = function*(){
      if (!helperWechat.checkSignature(this.request.query)) {
        this.status = 200;
        this.body = '';
      } else {
        this.status = 200;
        this.body = this.request.query.echostr;
      }
    };
    wechat.post = function*(){
      var data;
      logger.info('------------------ post api/wechat ----------------------');
      if (!helperWechat.checkSignature(this.request.query)) {
        logger.info('------------------ api/wechat auth no ----------------------');
        this.status = 200;
        this.body = '';
      } else {
        logger.info('------------------ api/wechat auth yes ----------------------');
        this.status = 200;
        data = yield function(done){
          helperWechat.getMsg(this.req, function(data){});
          logger.info(data);
          return helperWechat.all(function(data){}).text(function(data){
            var msg, results;
            msg = {
              FromUserName: data.ToUserName,
              ToUserName: data.FromUserName,
              Content: ">>> " + data.Content + " <<<"
            };
            results = helperWechat.parseMsg(msg);
            return done(null, results);
          });
        };
        this.body = data;
      }
    };
    function wechat(){}
    return wechat;
  }());
}).call(this);
