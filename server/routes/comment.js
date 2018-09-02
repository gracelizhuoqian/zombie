const express = require('express');
const router = express.Router();
const api = require('../models/model').Comment;
const checkToken = require('../middleware/checkToken');
// 创建
router.post('/comment/create', function (req, res, next) {
  api.createComment(req.body)
    .then((comment) => {
      if (comment) {
        res.send({
          code: 200,
          message: '回复成功',
          comment
        })
      } else {
        throw new Error('创建失败');
      }
    })
    .catch(err => {
      res.send({
        code: -200,
        message: err.toString()
      })
    })
})
// 删除
router.post('/comment/remove',checkToken, function (req, res, next) {
  api.removeComment(req.body.id) // 评论id
    .then(() => {
      res.send({
        code: 200,
        message: '删除成功'
      })
    })
    .catch(err => {
      res.send({
        code: -200,
        message: err.toString()
      })
    })
})

// 获取
router.post('/comment/lists', function (req, res, next) {
  let articleId=req.body.id;
  api.getComment(articleId)
    .then((lists) => {
      res.send({
        code: 200,
        lists
      })
    })
    .catch(err => {
      res.send({
        code: -200,
        message: err.toString()
      })
    })
})
router.post('/comment/reply',function(req,res,next){
  let commentId=req.body.id;
  let r={
    from:req.body.from,
    to:req.body.to,
    body:req.body.body,
    date:req.body.date
  }
  api.updateReply(commentId,r)
    .then(()=>{
        res.send({
          code:200,
          message:'回复成功'
        })
    })
    .catch(e=>{
      res.send({
        code:-200,
        message:e.toString()
      })
    })
})
module.exports = router;
