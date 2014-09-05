// Generated by CoffeeScript 1.8.0
(function() {
  var file, fs, _;

  fs = require("fs");

  _ = require("underscore");

  file = (function() {
    function file() {}


    /**
     * 根据正则取得文件名, 并去重
     * @param: dir   # 文件路径
     */

    file.getRouteFileSync = function(dir) {
      var files, route_files, routes;
      files = fs.readdirSync(dir);
      route_files = _.filter(files, function(item) {
        return /.*route(?=\.).*/i.test(item);
      });
      routes = _.union(_.map(route_files, function(route) {
        return route.replace(/\..*/i, "");
      }));
      return routes = _.map(routes, function(item) {
        var route, route_match;
        route_match = item.match(/.*(?=route)/i);
        route = route_match[0];
        route = route.replace(/_$/i, "");
        return [route, item];
      });
    };

    file.getControllerFileSync = function(dir) {
      var files, route_files, routes;
      files = fs.readdirSync(dir);
      route_files = _.filter(files, function(item) {
        return /.*controller(?=\.).*/i.test(item);
      });
      routes = _.union(_.map(route_files, function(route) {
        return route.replace(/\..*/i, "");
      }));
      return routes = _.map(routes, function(item) {
        var controller, controller_match;
        controller_match = item.match(/.*(?=controller)/i);
        controller = controller_match[0];
        controller = controller.replace(/_$/i, "");
        return [controller, item];
      });
    };

    file.loadConfigFileSync = function(path) {
      if (path) {
        return JSON.parse(fs.readFileSync(path, "utf8"));
      }
      return void 0;
    };

    return file;

  })();

  module.exports = file;

}).call(this);

//# sourceMappingURL=file.js.map
