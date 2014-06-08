// Generated by CoffeeScript 1.7.1
(function() {
  var app, express, express_config, log4js_config, logger, routes;

  express = require("express");

  express_config = require("./config/express");

  log4js_config = require("./config/log4js");

  routes = require("./routes");

  app = express();

  express_config(app);

  log4js_config(app);

  logger = require("./helper/logger").getLogger();

  logger.info("log4js");

  logger.error("error");

  logger.fatal("fatal");

  routes(app);

  app.use(function(req, res, next) {
    var err;
    err = new Error("Not Found");
    err.status = 404;
    return next(err);
  });

  if ("development" === app.get("env")) {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      return res.send({
        message: err.message,
        error: err.stack
      });
    });
  }

  if ("production" === app.get("env")) {
    0;
  }

  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    return res.send({
      message: err.message,
      error: err
    });
  });

  module.exports = app;

}).call(this);

//# sourceMappingURL=app.map
