const express = require('express');
const checkToekn = require('../middleware/checkToken');
const router = express.Router();
router.get('/admin',checkToekn,function (req,res,next){
  res.send({
    type:true,
    name:req.admin
  });
});
//路由到/admin，先执行checkToken中间件，验证用户token，验证通过后返回true
module.exports = router
