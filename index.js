/**
 * 模块路由
 * Created by ShenJian on 2016/12/30
 */
var fs = require('fs');
var path = require('path');
var express = require('express');

/**
 * 方法一
 * 自动指定目录的路由文件
 * @param dir
 * @returns {*}
 * 用法：app.js中加入以下代码
 * autoRoute.init(app, path.join(__dirname, 'app/modules'));
 */

/**
var autoRoute = {
    route_dir: __dirname,
    app: null,
    listDir: function(dir){
        var routeList = fs.readdirSync(dir, 'utf-8');

        for (var i = 0; i < routeList.length; i++) {
            var route_file = path.join(dir, routeList[i], 'routes');
            var stat = fs.lstatSync(route_file);
            if (stat.isDirectory()) {
                this.loadFile(routeList[i], route_file);
            }
        }
    },
    loadFile: function(rule, route_file){
        rule = (rule == 'index') ? '/' : '/' + rule;
        this.app.use(rule, require(route_file));
    },
    init: function(app, dir){
        this.app = app;
        this.route_dir = dir ? dir : this.route_dir;
        this.listDir(this.route_dir);
    }
};
*/

/**
 * 方法二
 * 根据模块名称，自动寻找路由文件
 * @param dir
 * @returns router
 * 用法：app.js中加入以下代码
 * app.use(autoRoute(path.join(__dirname, 'app/modules')));
 */
function autoRoute(dir){
    var router = express.Router();

    dir = dir ? dir : __dirname;
    var routeList = fs.readdirSync(dir, 'utf-8');

    // 循环读取模块中的route
    for (var i = 0; i < routeList.length; i++) {
        var route_file = path.join(dir, routeList[i], 'routes');
        var stat = fs.lstatSync(route_file);
        if (stat.isDirectory()) {
            var rule = (routeList[i] == 'index') ? '/' : '/' + routeList[i];
            router.use(rule, require(route_file));
        }
    }
    return router;
}

module.exports = autoRoute;