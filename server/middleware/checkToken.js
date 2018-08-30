// 验证token中间件 把用户状态的检查封装成一个中间件，在每个需要权限控制的路由加载该中间件，即可实现页面的权限控制。
var jwt = require('jsonwebtoken')
module.exports = function (req, res, next) {
  if (req.headers['authorization']) {
    var token = req.headers['authorization'].split(' ')[1]
    //取出token Authorization：token <token>
    var decoded = jwt.decode(token, '0315');
    let admin=(decoded.name=='lzq'?1:0);
    // 如果过期了就重新登录
    // tips 用名字验证是否可以操作，如果不是admin就不能进行需要授权的操作
    if (token && decoded.exp <= Date.now() / 1000) {
      return res.send({
        code: 401,
        message:"授权信息错误，请重新登录",
      })
    }
    if(!admin){
      return res.send({
        code: 403,
        message:"非管理员不能进行该操作",
      })
    }
  }
  // 有没有token已经被前端逻辑检测过了，这里只需要检测有效性，即内容是否正确
  next();
}
// tips 中间件就是用来处理请求的，当一个中间件处理完，可以通过调用 next() 传递给下一个中间件，如果没有调用 next()，则请求不会往下传递

/*3. 为什么会有token的出现？
答：首先，session的存储是需要空间的，其次，session的传递一般都是通过cookie来传递的，或者url重写的方式；而token在服务器是可以不需要存储用户的信息的，而token的传递方式也不限于cookie传递，当然，token也是可以保存起来的；

4. token的生成方式？
答：浏览器第一次访问服务器，根据传过来的唯一标识userId，服务端会通过一些算法，如常用的HMAC-SHA256算法，然后加一个密钥，生成一个token，然后通过BASE64编码一下之后将这个token发送给客户端；客户端将token保存起来，下次请求时，带着token，服务器收到请求后，然后会用相同的算法和密钥去验证token，如果通过，执行业务操作，不通过，返回不通过信息；
5. token和session的区别？
token和session其实都是为了身份验证，session一般翻译为会话，而token更多的时候是翻译为令牌；
session服务器会保存一份，可能保存到缓存，文件，数据库；同样，session和token都是有过期时间一说，都需要去管理过期时间；
其实token与session的问题是一种时间与空间的博弈问题，session是空间换时间，而token是时间换空间。两者的选择要看具体情况而定。

虽然确实都是“客户端记录，每次访问携带”，但 token 很容易设计为自包含的，也就是说，后端不需要记录什么东西，每次一个无状态请求，每次解密验证，每次当场得出合法 /非法的结论。这一切判断依据，除了固化在 CS 两端的一些逻辑之外，整个信息是自包含的。这才是真正的无状态。
而 sessionid ，一般都是一段随机字符串，需要到后端去检索 id 的有效性。万一服务器重启导致内存里的 session 没了呢？万一 redis 服务器挂了呢？

方案 A ：我发给你一张身份证，但只是一张写着身份证号码的纸片。你每次来办事，我去后台查一下你的 id 是不是有效。
方案 B ：我发给你一张加密的身份证，以后你只要出示这张卡片，我就知道你一定是自己人。
就这么个差别。
*/
