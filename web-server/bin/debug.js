// Generated by LiveScript 1.2.0
(function(){
  var app, port, server;
  app = require('../src/app');
  port = 3000;
  server = app.listen(port, function(){
    console.log("web server listening on port " + server.address().port);
  });
}).call(this);
