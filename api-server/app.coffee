express = require "express"

express_config = require "./config/express"
log4js_config = require "./config/log4js"

routes = require "./lib/routes"

app = express()

# configuration
log4js_config app
express_config app

# route
routes(app)

# 404
app.use (req, res, next) ->
  err = new Error("Not Found")
  err.status = 404
  next err

# err
if "development" == app.get "env"
  app.use (err, req, res, next) ->
    res.status err.status or 500
    res.send
      message: err.message,
      error: err.stack

if "production" == app.get "env"
  0

app.use (err, req, res, next) ->
  res.status err.status or 500
  res.send
    message: err.message

module.exports = app