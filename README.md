# express-modulesroute
模块路由

## 介绍
开发程序的时候，常用的模式就是模块和模块各自分开，比如控制器，路由规则，模型等等，express-modulesroute可以自动读取各个模块中的路由，不需要把每个模块的路由放到单独的routes文件夹中，这样在开发和维护的时候，结构比较清晰，路由跟着模块走，容易维护。

## 目录结构
```node
app // 可以自定义名字
  + modules // 可以自定义名字
    + ...
    + user // 可以自定义名字
      + ...
      + controllers // 控制器，路由的回调都放在这里执行，不是必须的
      + router // 不可以自定义名字
        + index.js // 不可以自定义名字
```

## 安装
```bash
$ npm install express-modulesroute
```

## 使用
在express项目中的主文件，以中间件的形式加入进来，如在app.js加入以下代码，因为是应用级中间件，所以不需要挂在到具体某个路径上，autoRoute接收一个参数，即模块路径，目录结构参考下面，因为我业务代码都写在app下面，不同的路由由不同的controller去处理

  express的app.js路由默认是这样的：
```node
app.use('/', index);
app.use('/users', users);
```

  把上面那段代码替换成：
```node
const modulesroute = require('express-modulesroute'); // 添加到文件头部
```
```node
app.use(modulesroute(path.join(__dirname, 'app/modules'))); // 'app/modules'替换成自己程序模块的目录
```
