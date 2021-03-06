// Generated by LiveScript 1.2.0
(function(){
  var koa, path, redis, consts, app, logger, redisClient;
  koa = require('koa');
  path = require('path');
  redis = require('redis');
  consts = require('../consts');
  app = koa();
  logger = require('../helpers/logger').getLogger('redis');
  redisClient = (function(){
    redisClient.displayName = 'redisClient';
    var prototype = redisClient.prototype, constructor = redisClient;
    function redisClient(redisConfig){
      var ref$, port, host, options;
      redisConfig == null && (redisConfig = consts.CONFIGURE.env.redis);
      ref$ = [redisConfig.port, redisConfig.host, redisConfig.options], port = ref$[0], host = ref$[1], options = ref$[2];
      return redis.createClient(port, host, options);
    }
    return redisClient;
  }());
  module.exports = redisClient;
}).call(this);
