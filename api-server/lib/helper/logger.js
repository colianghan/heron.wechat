// Generated by CoffeeScript 1.7.1
(function() {
  var log4js, logger;

  log4js = require("log4js");

  logger = (function() {
    function logger() {}

    logger.getLogger = function(category) {
      return log4js.getLogger(category);
    };

    return logger;

  })();

  module.exports = logger;

}).call(this);

//# sourceMappingURL=logger.map