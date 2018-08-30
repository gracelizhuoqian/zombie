const express = require('express');
const path = require('path');
const compress=require('compression');
const app = express();
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const routes = require('./routes');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(compress());
routes(app);
// 跨域
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");//预检请求使用
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");//预检请求使用
  next();
});

app.set('port', process.env.PORT || 8888);
mongoose.connect("mongodb://localhost:27017/zombie",{ useNewUrlParser: true });
app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

