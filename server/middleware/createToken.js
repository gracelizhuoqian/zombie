var jwt = require('jsonwebtoken')
module.exports = function (name){
    //用户名作为uid
    var expiry = new Date();
    expiry.setDate(expiry.getDate()+7);//有效期设置为七天
    const token = jwt.sign({
        name:name,
        exp:parseInt(expiry.getTime()/1000)//除以1000以后表示的是秒数
    },'0315')
    return token;
  }
//当用户想要使用受保护的路由时候，应该要在请求得时候带上 JWT ，一般的是在 header 的 Authorization 使用 Bearer 的形式，一个包含的 JWT 的请求头的 Authorization 如下：

//Authorization: token <token>
