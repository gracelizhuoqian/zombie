require('dotenv').config()
const UserModel = require('../models/model').User;
const express = require('express');
const router = express.Router();
const sha1 = require('sha1');
const createToken = require('../middleware/createToken');
router.post('/reg', function (req, res, next) {
  let name = req.body.account;
  let password = req.body.checkPass;
  password = sha1(password);
  //将用户密码加密后保存
  let user = {
    name: name,
    password: password
  }

  UserModel.createUser(user)
    .then(() => {
      res.send({
        // 创建用户成功
        code: 200,
        token: createToken(name)
        //创建token只需要用户名，创建并发送给用户
      })
    })
    .catch(err => {
      // 操作数据库的时候发生错误
      if (err.message.match('E11000 duplicate key')) {
        return res.json({
          code: -200,
          message: '用户名重复'
        })
      }
      // 服务器发生错误（例如status:）
      return res.json({
        code: -200,
        message: err.toString()
      })
    })
})
module.exports = router;
