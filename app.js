// 引入expresm模块，该模块集成了一般的webapp功能
var express = require('express');
// path模块，提供了一些用于处理文件路径的模块
var path = require('path');
// serve-favicon中间件，用于请求web的logo
var favicon = require('serve-favicon');
// morgan模块，日志记录器
var logger = require('morgan');
// express中间件cookie-parser，用于设置cookie消息的解析格式
var cookieParser = require('cookie-parser');
// express中间件body-parser，用于设置请求消息的解析格式
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

// 定义express对象
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// path.join用于将多个字符串用正确的路径连接符连接，在Unix系统使用"/"，Windows系统使用"\"
// favicon()使用logo路径初始化favicon对象
// __dirname，获取当前模块文件所在目录的完整绝对路径
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 使用日志记录器模块的开发模式，在控制台中显示请求的req信息，及处理返回码，处理时间等
app.use(logger('dev'));
// 以json格式，处理请求消息
app.use(bodyParser.json());
// 以UTF-8编码模式，处理请求消息
app.use(bodyParser.urlencoded({ extended: false }));
// 使用cookie-parser，处理cookie
app.use(cookieParser());
// 设定静态资料路径
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
// 捕捉404异常的回调
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
// 其他异常回调，并将异常显示在err模块页面上
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
